import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Admin } from '../';
import reservation from 'modules/roomReservation/utils';
import user from 'modules/user/utils';
import access from 'utils/access';
import _ from 'lodash';

const info = classNames(
  classes.infoBox,
  'ui grid'
);

export default class Content extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
  };
  render() {
    const { reservation: { notes, adminNotes } } = this.props;
    const reviewedBy = () => {
      const reviewedByName = _.get(this.props.reservation, 'approvedBy.fullName') || _.get(this.props.reservation, 'rejectedBy.fullName');

      if (reviewedByName) {
        return (
          <li>
            <strong>{reviewedByName}</strong> reviewed this reservation
          </li>
        );
      }
    };

    const color = reservation.getReservationColor(this.props.reservation);
    const status = reservation.getReservationStatus(this.props.reservation);
    const canApprove = access.has(this.props.roles, 'roomReservation:approve');

    return (
      <div className={classes.contentContainer}>
        <h2 className={classes.dateHeader}>{this.props.reservation.purpose}</h2>
        <span className={classes.subheader}><p className={classes.userHeader}>by {this.props.reservation.user.fullName}</p></span>
        <p className={classes.statusText} style={{ backgroundColor: color }}>{reservation.getReservationStatus(this.props.reservation)}</p>

        <div className={info}>
          <div className="five wide column">
            <p className={classes.header}>Start Date</p>
            <p className={classes.content}><FormatDate datetime={this.props.reservation.startDate} /></p>   

            <p className={classes.header}>End Date</p>
            <p className={classes.content}><FormatDate datetime={this.props.reservation.endDate} /></p>         
          </div>
          <div className="five wide column">
            <p className={classes.header}>Admin Notes</p>
            <p className={classes.content}>{adminNotes ? adminNotes : 'None.'}</p>
          </div>

          <div className="five wide column">
            <p className={classes.header}>Notes</p>
            <p className={classes.content}>{notes ? notes : 'None.'}</p>
          </div>
        </div>
        
        <div className="ui grid">
          <div className="eight wide column">
            <p className={classes.activityHeader}>Room</p>
            <p className={classes.content}>{this.props.reservation.room.label}</p>
          </div>
          <div className="eight wide column">
            <h2 className={classes.activityHeader}>Activity</h2>
            <div className={classes.activityBox}>
              <ul>
                <li>
                  <strong>{this.props.reservation.user.fullName}</strong> created this on <FormatDate datetime={this.props.reservation.createdAt} />
                </li>
                { reviewedBy() }
              </ul>
            </div>
          </div>
        </div>
        
        { canApprove ? <Admin reservation={this.props.reservation} actions={this.props.actions} /> : null }
      </div>
    );
  }
}

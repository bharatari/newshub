import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Devices } from '../';
import reservation from 'modules/reservation/utils';
import user from 'modules/user/utils';
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
    const checkedOutBy = () => {
      const checkedOutByName = _.get(this.props.reservation, 'checkedOutBy.fullName');

      if (checkedOutByName) {
        return (
          <li>
            <strong>{checkedOutByName}</strong> checked out this reservation
          </li>
        );
      }
    };
    const checkedInBy = () => {
      const checkedInByName = _.get(this.props.reservation, 'checkedInBy.fullName');

      if (checkedInByName) {
        return (
          <li>
            <strong>{checkedInByName}</strong> checked in this reservation
          </li>
        );
      }
    };

    const color = reservation.getReservationColor(this.props.reservation);
    const status = reservation.getReservationStatus(this.props.reservation);

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
            <p className={classes.activityHeader}>Devices</p>
            <Devices devices={this.props.reservation.devices} />
          </div>
          <div className="eight wide column">
            <h2 className={classes.activityHeader}>Activity</h2>
            <div className={classes.activityBox}>
              <ul>
                <li>
                  <strong>{this.props.reservation.user.fullName}</strong> created this on <FormatDate datetime={this.props.reservation.startDate} />
                </li>
                { reviewedBy() }
                { checkedOutBy() }
                { checkedInBy() }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

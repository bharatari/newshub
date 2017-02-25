import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Admin, Devices } from '../';
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
    const { reservation: { notes, specialRequests, adminNotes } } = this.props;
    const reviewedBy = _.get(this.props.reservation, 'approvedBy.fullName') || _.get(this.props.reservation, 'rejectedBy.fullName');
    const checkedOutBy = _.get(this.props.reservation, 'checkedOutBy.fullName');
    const checkedInBy = _.get(this.props.reservation, 'checkedInBy.fullName');

    const color = reservation.getReservationColor(this.props.reservation);
    const status = reservation.getReservationStatus(this.props.reservation);

    return (
      <div className={classes.contentContainer}>
        <h2 className={classes.dateHeader}><FormatDate datetime={this.props.reservation.startDate} format="MMMM Do YYYY" /></h2>
        <span className={classes.subheader}><p className={classes.timeHeader}><FormatDate datetime={this.props.reservation.startDate} format="HH:MM A" /></p> <p className={classes.userHeader}>by {this.props.reservation.user.fullName}</p></span>
        <p className={classes.statusText} style={{ backgroundColor: color }}>{reservation.getReservationStatus(this.props.reservation)}</p>

        <div className={info}>
          <div className="five wide column">
            <p className={classes.header}>Purpose</p>
            <p className={classes.content}>{this.props.reservation.purpose}</p>   

            <p className={classes.header}>End Date</p>
            <p className={classes.content}><FormatDate datetime={this.props.reservation.endDate} /></p>         
          </div>
          <div className="five wide column">
            <p className={classes.header}>Special Requests</p>
            <p className={classes.content}>{specialRequests ? specialRequests : 'None.'}</p>
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
                  {this.props.reservation.user.fullName} created this on <FormatDate datetime={this.props.reservation.startDate} />
                </li>
                <li>
                  {reviewedBy} reviewed this reservation
                </li>
                <li>
                  {checkedOutBy} checked out this reservation
                </li>
                <li>
                  {checkedInBy} checked in this reservation
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        { user.isAdmin(this.props.user) ? <Admin reservation={this.props.reservation} actions={this.props.actions} /> : null }
      </div>
    );
  }
}

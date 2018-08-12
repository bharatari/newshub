import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate, Deleter } from 'components/';
import { Actions, Devices, AdminNotes } from '../';
import reservation from 'modules/reservation/utils';
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
    const { reservation: { notes, adminNotes }, roles, deleteReservation } = this.props;
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
    const canApprove = access.has(roles, 'reservation:approve');
    const canDelete = access.has(roles, 'reservation:delete');

    const startTimeIcon = classNames(
      'ion-ios-pulse-strong',
      classes.icon
    );

    const endTimeIcon = classNames(
      'ion-ios-redo',
      classes.icon
    )

    const notesIcon = classNames(
      'ion-ios-chatboxes',
      classes.icon
    );
    
    const miscIcon = classNames(
      'ion-ios-analytics',
      classes.icon
    );

    return (
      <div className={classes.contentContainer}>
        <h2 className={classes.header}>{this.props.reservation.purpose}</h2>
        <span className={classes.subheader}><span className={classes.createdBy}>By </span><p className={classes.userHeader}>{this.props.reservation.user.fullName}</p></span>
        <p className={classes.statusText} style={{ backgroundColor: color }}>{reservation.getReservationStatus(this.props.reservation)}</p>

        <p className={classes.notes}>{notes ? notes : null}</p>

        <div className={info}>
          <div className="five wide column">
            <p className={classes.infoHeader}>Start Date</p>
            <i className={startTimeIcon} style={{ color: 'rgb(45, 96, 163)' }}></i><p className={classes.infoContent}><FormatDate datetime={this.props.reservation.startDate} /></p>
          </div>

          <div className="five wide column">
            <p className={classes.infoHeader}>End Date</p>
            <i className={endTimeIcon} style={{ color: 'rgb(234, 192, 94)' }}></i><p className={classes.infoContent}><FormatDate datetime={this.props.reservation.endDate} /></p>
          </div>

          <div className="six wide column">
            <p className={classes.infoHeader}>Admin Notes</p>
            <i className={miscIcon} style={{ color: 'rgb(45, 96, 163)' }}></i><AdminNotes allowEditing={canApprove} actions={this.props.actions} reservation={this.props.reservation} />
          </div>
        </div>
        
        <div className="ui grid">
          <div className="eight wide column">
            <p className={classes.boldHeader}>Devices</p>
            <Devices devices={this.props.reservation.devices} />
          </div>
          <div className="eight wide column">
            <h2 className={classes.boldHeader}>Activity</h2>
            <div className={classes.activityBox}>
              <ul>
                <li>
                  <strong>{this.props.reservation.user.fullName}</strong> created this on <FormatDate datetime={this.props.reservation.createdAt} />
                </li>
                { reviewedBy() }
                { checkedOutBy() }
                { checkedInBy() }
              </ul>
            </div>
          </div>
        </div>
        
        { canApprove ? <Actions reservation={this.props.reservation} actions={this.props.actions} /> : null }        

        <div className={classes.dangerZone}>
          { canDelete ? <p className={classes.boldHeader}>Danger Zone</p> : null }
          <Deleter id={this.props.reservation.id} delete={this.props.actions.deleteReservation} success={deleteReservation.reservation}
            error={deleteReservation.error} requesting={deleteReservation.requesting} roles={roles} model="reservation"
            push={this.props.actions.push} />
        </div>
      </div>
    );
  }
}

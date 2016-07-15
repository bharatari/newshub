import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Admin, Devices } from '../';
import reservation from 'modules/reservation/utils';
import user from 'modules/user/utils';

export default class Content extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
  };
  render() {
    return (
      <div>
        <p className={classes.header}>Name</p>
        <p className={classes.content}>{this.props.reservation.user.fullName}</p>
        <p className={classes.header}>Purpose</p>
        <p className={classes.content}>{this.props.reservation.purpose}</p>
        <p className={classes.header}>Notes</p>
        <p className={classes.content}>{this.props.reservation.notes}</p>
        <p className={classes.header}>Special Requests</p>
        <p className={classes.content}>{this.props.reservation.specialRequests}</p>
        <p className={classes.header}>Admin Notes</p>
        <p className={classes.content}>{this.props.reservation.adminNotes}</p>
        <p className={classes.header}>Start Date</p>
        <p className={classes.content}><FormatDate date={this.props.reservation.startDate} /></p>
        <p className={classes.header}>End Date</p>
        <p className={classes.content}><FormatDate date={this.props.reservation.endDate} /></p>
        <p className={classes.header}>Devices</p>
        <Devices devices={this.props.reservation.devices} />
        <p className={classes.header}>STATUS</p>
        <p className={classes.content}>{reservation.getReservationStatus(this.props.reservation)}</p>
        { user.isAdmin(this.props.user) ? <Admin reservation={this.props.reservation} actions={this.props.actions} /> : null }
      </div>
    );
  }
}

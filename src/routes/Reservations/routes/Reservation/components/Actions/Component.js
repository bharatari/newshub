import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading } from 'components/';
import reservationUtils from 'modules/reservation/utils';
import { Menu, Dropdown, Button, Icon } from 'antd';

export default class Actions extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
    requestingReservation: PropTypes.bool,
  };
  handleClick = () => {
    const status = reservationUtils.computeReservationStatus(this.props.reservation);
    const body = reservationUtils.constructAdminAction(status);

    this.props.actions.updateReservation(this.props.reservation.id, body);
  };
  handleReject = () => {
    const status = reservationUtils.computeReservationStatus(this.props.reservation);
    const body = reservationUtils.constructAdminAction(status, true);

    this.props.actions.updateReservation(this.props.reservation.id, body);
  };
  handleAdminNotes = (values) => {
    this.props.actions.updateReservation(this.props.reservation.id, values);
  };
  render() {
    const { reservation } = this.props;

    const button = () => {
      if (reservation) {
        const status = reservationUtils.computeReservationStatus(reservation);
        const needsApproval = (
          <Button.Group>
            <Button type="primary" onClick={this.handleClick} ghost>Approve</Button>
            <Button type="danger" onClick={this.handleReject} ghost>Reject</Button>
          </Button.Group>
        );

        if (status === 'NEEDS_APPROVAL') {
          return needsApproval;
        } else if (status === 'APPROVED') {
          return <Button type="primary" onClick={this.handleClick} ghost>Check Out</Button>;
        } else if (status === 'CHECKED_OUT') {
          return <Button onClick={this.handleClick} ghost>Check In</Button>;
        } else if (status === 'CHECKED_IN') {
          return null;
        } else {
          return null;
        }
      } else {
        return null;
      }
    };

    const actions = button();

    if (actions) {
      return (
        <div>
          <p className={classes.header}>Actions</p>
          {actions}
        </div>
      )
    }

    return null;
  }
}

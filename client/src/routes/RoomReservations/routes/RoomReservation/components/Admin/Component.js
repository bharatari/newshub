import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading } from 'components/';
import reservationUtils from 'modules/reservation/utils';
import Form from './Form';

const buttonStyle = classNames(
  'ui button blue button-light'
);

const negativeStyle = classNames(
  'ui button red button-light'
);

export default class Admin extends React.Component {
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
  handleDisable = () => {
    // update reservation with disable flag
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
          <div>
            <button className={buttonStyle} onClick={this.handleClick}>APPROVE</button>
            <button className={negativeStyle} onClick={this.handleReject}>REJECT</button>
          </div>
        );

        if (status === 'NEEDS_APPROVAL') {
          return needsApproval;
        } else if (status === 'APPROVED') {
          return <button className={negativeStyle} onClick={this.handleDisable}>DISABLE</button>;
        } else {
          return <p className={classes.empty}>Nothing to see here...</p>;;
        }
      } else {
        return null;
      }
    };

    return (
      <div>
        <p className={classes.header}>Actions</p>
        {button()}
        <Form onSubmit={this.handleAdminNotes} />
      </div>
    );
  }
}

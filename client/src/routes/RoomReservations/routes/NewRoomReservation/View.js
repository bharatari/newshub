import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Card, Modal, Response } from 'components/';
import { Form, Wizard, ModalContent, Schedule } from './components';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from 'antd';
import _ from 'lodash';

export default class NewRoomReservationView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    requestedRooms: false,
    requestedRoomReservations: false,
  }
  componentDidMount() {
    this.props.actions.resetCreateRoomReservation();
    this.props.actions.resetFetchRoomReservations();
    this.props.actions.fetchRooms(null, null, false);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newRoomReservation) {
      if (nextProps.newRoomReservation.values) {
        const { roomId } = nextProps.newRoomReservation.values;

        if (!this.props.newRoomReservation.values) {
          if (roomId && !this.state.requestedRoomReservations) {
            this.props.actions.fetchRoomReservations({
              roomId,
              sortType: 'DESC',
              sortField: 'startDate',
              disabled: false,
            });

            this.setState({
              requestedRoomReservations: true,
            });
          }          
        } else {
          const { roomId: oldRoomId } = this.props.newRoomReservation.values;

          if (!_.isNil(roomId)) {
            if (roomId !== oldRoomId) {
              if (!this.state.requestedRoomReservations) {
                this.props.actions.fetchRoomReservations({
                  roomId,
                  sortType: 'DESC',
                  sortField: 'startDate',
                  disabled: false,
                });

                this.setState({
                  requestedRoomReservations: true,
                });
              }
            }
          }
        }       
      }
    }
  }
  handleSubmit = (values) => {
    this.props.actions.createRoomReservation(values);
    scroll.scrollToTop();
  };
  handleClick = () => {
    this.refs.form.submit();
  };
  render() {
    const disable = this.props.requestingCreateReservation || this.props.createdRoomReservation;
    const loading = this.props.requestingCreateReservation || this.props.requestingRooms || this.props.requestingRoomReservations;

    const right = (
      <Button onClick={this.handleClick} loading={loading} disabled={disable} type="primary" ghost>
        Save
      </Button>
    );

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Room Reservation" right={right} loading={loading} user={this.props.user}
          roles={this.props.roles}>
          <Card column="sixteen">
            <Response error={this.props.error} response={this.props.createdRoomReservation}
              successHeader="Your reservation has been created" 
              successText="It will need to be approved by a member of management" />
            <Form ref="form" requestingCreateReservation={this.props.requestingCreateReservation}
              onSubmit={this.handleSubmit} rooms={this.props.rooms} />
            { this.props.roomReservations ? <Schedule roomReservations={this.props.roomReservations} /> : null }
            {right}
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
;
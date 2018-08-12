import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Admin, Content } from './components';

export default class RoomReservationView extends React.Component {
  static propTypes = {
    roomReservation: PropTypes.object,
    requestingRoomReservation: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.resetUpdateRoomReservation();
    this.props.actions.fetchRoomReservation(this.props.id);
  }
  handleClick = () => {
    this.props.actions.push('/app/room-reservation/new');
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedRoomReservation && !nextProps.requestingUpdateRoomReservation) {
      if (!this.state.updated) {
        this.props.actions.fetchRoomReservation(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateRoomReservation) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { roomReservation, requestingRoomReservation, 
            actions, updateError, updatedRoomReservation,
            requestingUpdateRoomReservation, currentUrl, user } = this.props;

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Room Reservation" loading={requestingRoomReservation || requestingUpdateRoomReservation}
          user={this.props.user} roles={this.props.roles}>
          <Card column="sixteen">
            <div>
              <Response error={updateError} response={updatedRoomReservation}
                successHeader="You successfully updated this reservation." />
              {
                roomReservation ? 
                <Content reservation={roomReservation} actions={actions} user={user} roles={this.props.roles} /> :
                <TextLoading loading={requestingRoomReservation} /> 
              }
            </div>
          </Card>
        </SidebarPage>
      </div>
    );
  }
}

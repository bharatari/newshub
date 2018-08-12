import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Content } from './components';

export default class UserView extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    room: PropTypes.object,
    requestingRoom: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.resetUpdateRoom();
    this.props.actions.fetchRoom(this.props.id);
    this.props.actions.fetchRoomReservations({
        id: this.props.id,
        sortType: 'DESC',
        sortField: 'startDate',
        disabled: false,
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedRoom && !nextProps.requestingUpdateRoom) {
      if (!this.state.updated) {
        this.props.actions.fetchRoom(this.props.id);

        this.props.actions.fetchRoomReservations({
          id: this.props.id,
          sortType: 'DESC',
          sortField: 'startDate',
          disabled: false,
        });

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateRoom) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { user, room, requestingRoom, error, actions, currentUrl, updatedRoom, requestingUpdateRoom } = this.props;
    const { form, updateRoom } = this.props;
    const successHeader = 'You successfully updated this room.';

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Room" loading={requestingRoom || requestingUpdateRoom} user={user}
          roles={this.props.roles}>
          <Card column="sixteen">
            <Response error={this.props.error} response={updatedRoom}
              successHeader={successHeader} />
            {
              room ?
              <Content room={this.props.room} actions={actions} updateRoom={this.props.updateRoom}
                form={this.props.form} user={this.props.user} roomReservations={this.props.roomReservations}
                roles={this.props.roles} /> :
              <TextLoading loading={requestingRoom} /> 
            }
            </Card>
        </SidebarPage>
      </div>
    );
  }
}

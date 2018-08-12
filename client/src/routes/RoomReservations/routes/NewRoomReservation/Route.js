import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as roomReservation from 'modules/roomReservation/actions';
import * as room from 'modules/room/actions';
import { routerActions } from 'react-router-redux';
import { processRooms } from 'modules/room/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  requestingCreateReservation: state.roomReservation.createRoomReservation.requesting,
  createdRoomReservation: state.roomReservation.createRoomReservation.reservation,
  error: state.roomReservation.createRoomReservation.error,
  rooms: processRooms(state),
  requestingRooms: state.room.fetchRooms.requesting,
  newRoomReservation: state.form.newRoomReservation,
  requestingRoomReservations: state.roomReservation.fetchRoomReservations.requesting,
  roomReservations: state.roomReservation.fetchRoomReservations.reservations,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...roomReservation,
  ...room,
};

const localActionCreators = {};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
  localActions: bindActionCreators(localActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

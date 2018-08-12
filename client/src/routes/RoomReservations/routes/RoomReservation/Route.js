import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as roomReservation from 'modules/roomReservation/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  id: ownProps.params.id,
  roomReservation: state.roomReservation.fetchRoomReservation.reservation,
  requestingReservation: state.roomReservation.fetchRoomReservation.requesting,
  updatedReservation: state.roomReservation.updateRoomReservation.reservation,
  requestingUpdateReservation: state.roomReservation.updateRoomReservation.requesting,
  updateError: state.roomReservation.updateRoomReservation.error,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...roomReservation,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as room from 'modules/room/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  user: state.user.fetchCurrentUser.user,
  room: state.room.createRoom.room,
  requesting: state.room.createRoom.requesting,
  error: state.room.createRoom.error,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...room,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

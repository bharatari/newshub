import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as user from 'modules/user/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  id: ownProps.params.id,
  currentUser: state.user.fetchCurrentUser.user,
  user: state.user.fetchUser.user,
  requestingUser: state.user.fetchUser.requesting,
  error: state.user.fetchUser.error,
  updateUser: state.user.updateUser,
  updatedUser: state.user.updateUser.user,
  requestingUpdateUser: state.user.updateUser.requesting,
  updateError: state.user.updateUser.error,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

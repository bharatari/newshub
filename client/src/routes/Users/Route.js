import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as user from 'modules/user/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  users: state.user.fetchUsers.users,
  roles: state.role.fetchRoles.roles,
  requestingUsers: state.user.fetchUsers.requesting,
  currentUser: state.user.fetchCurrentUser.user,
});

const actionCreators = {
  ...routerActions,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

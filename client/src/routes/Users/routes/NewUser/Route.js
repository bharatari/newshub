import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import { routerActions } from 'react-router-redux';
import * as user from 'modules/user/actions';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
  createUser: state.user.createUser,
});

const actionCreators = {
  ...routerActions,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

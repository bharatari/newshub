import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as user from 'modules/user/actions';
import * as authentication from 'modules/authentication/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
});

const actionCreators = {
  ...routerActions,
  ...user,
  ...authentication,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

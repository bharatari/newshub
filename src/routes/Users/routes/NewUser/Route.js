import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as signupToken from 'modules/signupToken/actions';
import { routeActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  token: state.signupToken.token,
  requestingToken: state.signupToken.requesting,
  error: state.signupToken.error,
});

const actionCreators = {
  ...routeActions,
  ...signupToken,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

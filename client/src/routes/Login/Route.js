import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as authentication from 'modules/authentication/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  query: ownProps.location.query,
  requestingLogin: state.authentication.login.requesting,
  error: state.authentication.login.error,
  response: state.authentication.login.response,
});

const actionCreators = {
  ...routerActions,
  ...authentication,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as actions from './modules/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  requestingCreateToken: state.resetPassword.requesting,
  error: state.resetPassword.error,
  response: state.resetPassword.response,
});

const actionCreators = {
  ...routerActions,
  ...actions,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

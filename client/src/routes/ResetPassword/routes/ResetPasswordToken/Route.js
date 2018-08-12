import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as actions from './modules/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  token: ownProps.params.token,
  requesting: state.resetPasswordToken.requesting,
  error: state.resetPasswordToken.error,
  response: state.resetPasswordToken.response,
});

const actionCreators = {
  ...routerActions,
  ...actions,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

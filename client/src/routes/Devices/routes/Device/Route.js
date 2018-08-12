import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as device from 'modules/device/actions';
import * as file from 'modules/file/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  id: ownProps.params.id,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
  device: state.device.fetchDevice.device,
  requestingDevice: state.device.fetchDevice.requesting,
  error: state.device.fetchDevice.error,
  updatedDevice: state.device.updateDevice.device,
  requestingUpdateDevice: state.device.updateDevice.requesting,
  updateError: state.device.updateDevice.error,
  updateDevice: state.device.updateDevice,
  form: state.form.fileUploader,
});

const actionCreators = {
  ...routerActions,
  ...device,
  ...file,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

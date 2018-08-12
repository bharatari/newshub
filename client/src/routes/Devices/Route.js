import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as device from 'modules/device/actions';
import { routerActions } from 'react-router-redux';
import { pageSelector } from 'modules/device/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  devices: state.device.fetchDevices.devices,
  requestingDevices: state.device.fetchDevices.requesting,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
  totalPages: state.device.fetchDevices.totalPages,
  sortField: ownProps.location.query.sortField,
  sortType: ownProps.location.query.sortType,
  page: pageSelector(ownProps),
  location: ownProps.location,
});

const actionCreators = {
  ...routerActions,
  ...device,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

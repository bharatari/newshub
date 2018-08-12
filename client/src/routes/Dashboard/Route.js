import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import { routerActions } from 'react-router-redux';
import * as actions from './modules/actions';
import * as device from 'modules/device/actions';
import * as reservation from 'modules/reservation/actions';
import * as user from 'modules/user/actions';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
  upcomingReservations: state.dashboard.upcomingReservations.reservations,
  requestingUpcoming: state.dashboard.upcomingReservations.requesting,
  currentReservations: state.dashboard.currentReservations.reservations,
  requestingCurrent: state.dashboard.currentReservations.requesting,
  totalDevices: state.device.fetchDevices.total,
  totalReservations: state.reservation.fetchReservations.total,
  totalUsers: state.user.fetchUsers.total,
});

const actionCreators = {
  ...routerActions,
  ...actions,
  ...device,
  ...reservation,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

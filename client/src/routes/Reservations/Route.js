import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as reservation from 'modules/reservation/actions';
import { routerActions } from 'react-router-redux';
import { pageSelector } from 'modules/reservation/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  reservations: state.reservation.fetchReservations.reservations,
  requestingReservations: state.reservation.fetchReservations.requesting,
  user: state.user.fetchCurrentUser.user,
  totalPages: state.reservation.fetchReservations.totalPages,
  sortField: ownProps.location.query.sortField,
  sortType: ownProps.location.query.sortType,
  page: pageSelector(ownProps),
  location: ownProps.location,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...reservation,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

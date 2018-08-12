import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as roomReservation from 'modules/roomReservation/actions';
import { routerActions } from 'react-router-redux';
import { pageSelector } from 'modules/roomReservation/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  roomReservations: state.roomReservation.fetchRoomReservations.reservations,
  requestingRoomReservations: state.roomReservation.fetchRoomReservations.requesting,
  user: state.user.fetchCurrentUser.user,
  totalPages: state.roomReservation.fetchRoomReservations.totalPages,
  sortField: ownProps.location.query.sortField,
  sortType: ownProps.location.query.sortType,
  page: pageSelector(ownProps),
  location: ownProps.location,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...roomReservation,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

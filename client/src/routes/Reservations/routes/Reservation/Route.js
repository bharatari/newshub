import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as reservation from 'modules/reservation/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  roles: state.role.fetchRoles.roles,
  id: ownProps.params.id,
  reservation: state.reservation.fetchReservation.reservation,
  requestingReservation: state.reservation.fetchReservation.requesting,
  updatedReservation: state.reservation.updateReservation.reservation,
  requestingUpdateReservation: state.reservation.updateReservation.requesting,
  updateError: state.reservation.updateReservation.error,
  user: state.user.fetchCurrentUser.user,
  deleteReservation: state.reservation.deleteReservation,
});

const actionCreators = {
  ...routerActions,
  ...reservation,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

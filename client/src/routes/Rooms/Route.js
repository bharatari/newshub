import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as room from 'modules/room/actions';
import { routerActions } from 'react-router-redux';
import { pageSelector } from 'modules/reservation/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  rooms: state.room.fetchRooms.rooms,
  requestingRooms: state.room.fetchRooms.requesting,
  user: state.user.fetchCurrentUser.user,
  totalPages: state.room.fetchRooms.totalPages,
  sortField: ownProps.location.query.sortField,
  sortType: ownProps.location.query.sortType,
  page: pageSelector(ownProps),
  location: ownProps.location,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...room,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

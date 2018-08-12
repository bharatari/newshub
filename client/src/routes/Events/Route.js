import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as event from 'modules/event/actions';
import { routerActions } from 'react-router-redux';
import { pageSelector } from 'modules/event/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  events: state.event.fetchEvents.events,
  requestingEvents: state.event.fetchEvents.requesting,
  user: state.user.fetchCurrentUser.user,
  totalPages: state.event.fetchEvents.totalPages,
  sortField: ownProps.location.query.sortField,
  sortType: ownProps.location.query.sortType,
  page: pageSelector(ownProps),
  location: ownProps.location,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...event,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

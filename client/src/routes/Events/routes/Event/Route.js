import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as authentication from 'modules/authentication/actions';
import * as event from 'modules/event/actions';
import * as log from 'modules/log/actions';
import * as actions from './modules/actions';
import { destroy } from 'redux-form';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  id: ownProps.params.id,
  event: state.event.fetchEvent.event,
  requestingEvent: state.event.fetchEvent.requesting,
  updatedEvent: state.event.updateEvent.event,
  requestingUpdateEvent: state.event.updateEvent.requesting,
  updateError: state.event.updateEvent.error,
  log: state.log.createLog.log,
  requestingCreateLog: state.log.createLog.requesting,
  createLogError: state.log.createLog.error,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
  logs: state.log.fetchLogs.logs,
  requestingLogs: state.log.fetchLogs.requesting,
  totalPages: state.log.fetchLogs.totalPages,
  location: ownProps.location,
  searchUsers: state.eventRoute.searchUsers.users,
  manualLog: state.eventRoute.createLog,
  deleteEvent: state.event.deleteEvent,
});

const actionCreators = {
  ...routerActions,
  ...event,
  ...log,
  ...authentication,
  destroy,
};

const localActionCreators = {
  ...actions,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
  localActions: bindActionCreators(localActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

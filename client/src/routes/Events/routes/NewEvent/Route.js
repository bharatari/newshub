import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as event from 'modules/event/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  requestingCreateEvent: state.event.createEvent.requesting,
  createdEvent: state.event.createEvent.event,
  error: state.event.createEvent.error,
  newEvent: state.form.newEvent,
  requestingEvents: state.event.fetchEvents.requesting,
  events: state.event.fetchEvents.events,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...event,
};

const localActionCreators = {};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
  localActions: bindActionCreators(localActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);

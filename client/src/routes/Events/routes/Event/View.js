import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Content, Scanner } from './components';

export default class EventView extends React.Component {
  static propTypes = {
    event: PropTypes.object,
    requestingEvent: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.resetUpdateEvent();
    this.props.actions.resetCreateLog();
    this.props.actions.resetFetchLogs();
    this.props.actions.fetchEvent(this.props.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedEvent && !nextProps.requestingUpdateEvent) {
      if (!this.state.updated) {
        this.props.actions.fetchEvent(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateEvent) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { event, requestingEvent, 
            actions, updateError, updatedEvent,
            requestingUpdateEvent, currentUrl, user,
            log, logs, requestingCreateLog, createLogError,
            sortField, sortType, totalPages, page,
            requestingLogs, location, localActions,
            searchUsers, manualLog, roles, deleteEvent } = this.props;

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Event" loading={requestingEvent || requestingUpdateEvent}
          user={this.props.user} roles={roles}>
          <Card column="sixteen">
            <div>
              <Response error={updateError} response={updatedEvent}
                successHeader="You successfully updated this event." />
              {
                event ?
                <Content event={event} actions={actions} user={user} log={log} logs={logs}
                  requestingLogs={requestingLogs} totalPages={totalPages} localActions={localActions}
                  requestingCreateLog={requestingCreateLog} createLogError={createLogError} 
                  searchUsers={searchUsers} manualLog={manualLog} roles={roles} deleteEvent={deleteEvent} /> :
                <TextLoading loading={requestingEvent} /> 
              }
            </div>
          </Card>
        </SidebarPage>
      </div>
    );
  }
}

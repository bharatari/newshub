import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Data } from 'components/';
import event from 'modules/event/utils';

export default class EventsView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    fields: [
      { label: 'Name', property: 'name'},
      { label: 'Start Date', property: 'startDate', type: 'date' },
      { label: 'End Date', property: 'endDate', type: 'date' },
      { label: 'Created At', property: 'createdAt', type: 'date' },
    ],
    reload: false,
  };
  render() {
    return (
      <Data data={this.props.events} loading={this.props.requestingEvents}
        header="Events" user={this.props.user} currentUrl={this.props.currentUrl}
        actions={this.props.actions} fields={this.state.fields} route="/app/event"
        page={this.props.page} totalPages={this.props.totalPages}
        goToPage={this.goToPage} sortField={this.props.sortField} sortType={this.props.sortType}
        sortBy={this.sortBy} newURL="/app/event/new" location={this.props.location} 
        fetch={this.props.actions.fetchEvents} roles={this.props.roles} />
    );
  }
}

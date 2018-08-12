import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Status, Data } from 'components/';
import room from 'modules/room/utils';

export default class RoomsView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    fields: [
      { label: 'Label', property: 'label' },
      { label: 'Building', property: 'building.name' },
      { label: 'Created At', property: 'createdAt', type: 'date' },
    ],
    reload: false,
  };
  render() {
    return (
      <Data data={this.props.rooms} loading={this.props.requestingRooms}
        header="Rooms" user={this.props.user} currentUrl={this.props.currentUrl}
        actions={this.props.actions} fields={this.state.fields} route="/app/room"
        page={this.props.page} totalPages={this.props.totalPages}
        goToPage={this.goToPage} sortField={this.props.sortField} sortType={this.props.sortType}
        sortBy={this.sortBy} newURL="/app/room/new" location={this.props.location}
        fetch={this.props.actions.fetchRooms} roles={this.props.roles} />
    );
  }
}

import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Data } from 'components/';
import { Disabled } from './components';
import reservation from 'modules/reservation/utils';

export default class DevicesView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  state = {
    fields: [
      { label: 'Name', property: 'name', component: Disabled },
      { label: 'Label', property: 'label' },
      { label: 'Type', property: 'type' },
      { label: 'Barcode', property: 'barcode' },
      { label: 'Created', property: 'createdAt', type: 'date' },
    ]
  };
  render() {
    return (
      <Data data={this.props.devices} loading={this.props.requestingDevices}
        header="Devices" user={this.props.user} currentUrl={this.props.currentUrl}
        actions={this.props.actions} fields={this.state.fields} route="/app/device"
        page={this.props.page} totalPages={this.props.totalPages}
        goToPage={this.goToPage} sortField={this.props.sortField} sortType={this.props.sortType}
        sortBy={this.sortBy} newURL="/app/device/new" location={this.props.location}
        fetch={this.props.actions.fetchDevices} roles={this.props.roles} />
    );
  }
}

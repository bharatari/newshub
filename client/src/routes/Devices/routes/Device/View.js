import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import access from 'utils/access';
import { Button } from 'antd';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Content } from './components';

export default class UserView extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    device: PropTypes.object,
    requestingDevice: PropTypes.bool,
  };
  state = {
    updated: false,
    showEditModal: false,
  };
  hideEditModal = () => {
    this.setState({
      showEditModal: false,
    });
  };
  componentDidMount() {
    this.props.actions.resetUpdateDevice();
    this.props.actions.fetchDevice(this.props.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedDevice && !nextProps.requestingUpdateDevice) {
      if (!this.state.updated) {
        this.props.actions.fetchDevice(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateDevice) {
      this.setState({
        updated: false,
      });
    }
  }
  handleClick = () => {
    this.setState({
      showEditModal: true,
    });
  };
  render() {
    const { user, device, requestingDevice, error, actions, currentUrl, updatedDevice, requestingUpdateDevice } = this.props;
    const { form, updateDevice } = this.props;
    const successHeader = 'You successfully updated this device.';
    const edit = access.has(this.props.roles, 'device:update');

    const right = (
      <Button onClick={this.handleClick} type="primary" ghost>
        Edit
      </Button>
    );

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Device" loading={requestingDevice || requestingUpdateDevice} user={user}
          roles={this.props.roles} right={right}>
          <Card column="sixteen" noPadding>
            <Response error={this.props.error} response={updatedDevice}
              successHeader={successHeader} />
            {
              device ?
              <Content device={this.props.device} actions={actions} updateDevice={this.props.updateDevice}
                form={this.props.form} user={this.props.user} roles={this.props.roles} showEditModal={this.state.showEditModal}
                hideEditModal={this.hideEditModal} /> :
              <TextLoading loading={requestingDevice} /> 
            }
            </Card>
        </SidebarPage>
      </div>
    );
  }
}

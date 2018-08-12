import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Response, Card } from 'components/';
import { Form } from './components';
import { Button } from 'antd';

export default class NewReservationView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  componentDidMount() {
    this.props.actions.resetCreateDevice();
  }
  handleSubmit = (values) => {
    this.props.actions.createDevice(values);
  };
  handleClick = () => {
    this.refs.form.submit();
  };
  render() {
    const disable = this.props.requesting || this.props.device;
    const loading = this.props.requesting;

    const right = (
      <Button onClick={this.handleClick} loading={loading} disabled={disable} type="primary" ghost>
        Save
      </Button>
    );

    const message = "Your device has been created.";

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Device" right={right} loading={loading} user={this.props.user}
          roles={this.props.roles}>
          <Card column="sixteen">
            <Response error={this.props.error} response={this.props.device}
              successHeader={message} />
            <Form ref="form" onSubmit={this.handleSubmit} uploadFile={this.props.actions.uploadFile} createFile={this.props.createFile} />
          </Card>
        </SidebarPage>
      </div>
    );
  }
};

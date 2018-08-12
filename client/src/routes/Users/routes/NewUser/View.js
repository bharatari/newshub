import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Response, Card } from 'components/';
import { Form } from './components';

export default class NewUserView extends React.Component {
  handleSubmit = (values) => {
    delete values.confirmPassword;
    
    this.props.actions.createUser(values);

    // if user is existing by email,
    // just add the new join table details
    // and ignore first name and last name

    // After entering email address, it'll check the
    // server to see if the email already exists

    // If so, it'll gray out first name, last name and password
  };
  render() {
    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New User" loading={this.props.createUser.loading} user={this.props.user}
          roles={this.props.roles}>
          <Card column="sixteen">
            <Response error={this.props.createUser.error} response={this.props.createUser.user} />
            <Form createUser={this.props.createUser} onSubmit={this.handleSubmit} />
          </Card>
        </SidebarPage>
      </div>
    );
  }
}

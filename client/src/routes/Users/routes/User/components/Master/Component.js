import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading } from 'components/';
import Form from './Form';

export default class Master extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };
  handleSubmit = (values) => {
    delete values.currentOrganizationId;

    this.props.actions.updateUser(values, this.props.user.id);
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} updateUser={this.props.updateUser} />
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading, Card } from 'components/';
import { Disabled } from './components';
import reservation from 'modules/reservation/utils';
import { Button } from 'antd';

export default class UsersView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  state = {
    fields: [
      { label: 'Name', property: 'fullName', component: Disabled },
      { label: 'Email', property: 'email' },
      { label: 'Title', property: 'organization_users.title' },
      { label: 'Created', property: 'createdAt', type: 'date' },
    ]
  };
  componentDidMount() {
    this.props.actions.fetchUsers();
  }
  handleClick = () => {
    this.props.actions.push('/app/user/new');
  };
  render() {
    const right = (
      <Button onClick={this.handleClick} type="primary" ghost>
        Add
      </Button>
    );

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="Users" right={right} loading={this.props.requestingUsers} user={this.props.currentUser}
          roles={this.props.roles}>
          <Card column="sixteen">
            {
              this.props.users ?
              <Table fields={this.state.fields}
                data={this.props.users} 
                actions={this.props.actions}
                route="/app/user" />
              : <TextLoading loading={this.props.requestingUsers} />
            }
          </Card>
        </SidebarPage>
      </div>
    );
  }
}

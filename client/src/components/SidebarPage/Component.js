import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import Sidebar from './Sidebar';
import classNames from 'classnames';
import { Notifications } from 'components/';
import { Layout, Header, Content, Footer, Icon, Menu, Badge, Dropdown, Avatar, notification } from 'antd';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as user from 'modules/user/actions';
import * as authentication from 'modules/authentication/actions';

const SubMenu = Menu.SubMenu;

const main = classNames(
  classes.main
);

const padding = classNames(
  classes.sidebarContainerPadding
);

const button = classNames(
  'toggle-button',
  classes.button
);

class SidebarPage extends React.Component {
  static propTypes = {
    currentUrl: PropTypes.string,
    actions: PropTypes.object,
    user: PropTypes.object,
    roles: PropTypes.array.isRequired,
  };
  state = {
    switchedOrganization: false,
    active: false,
    collapsed: true,
  };
  handleClick = () => {
    if (this.state.active) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
  }
  handleMenu = (item, key, keyPath) => {
    if (item.key === 'logout') {
      this.props.actions.logout();
    } else if (item.key.substring(0, 9) === '/app/user') {
      this.props.actions.push(item.key);
    } else {
      this.props.actions.switchOrganization(this.props.user.id, item.key);
    }
  }
  componentWillReceiveProps(nextProps) {
    if ((this.props.requestingSwitchOrganization && !nextProps.requestingSwitchOrganization) && nextProps.switchOrganization && !this.state.switchedOrganization) {
      this.setState({
        switchedOrganization: true,
      });
      
      this.props.actions.push('/');

      notification.success({
        message: `Switched to ${nextProps.switchOrganization.currentOrganization.label}`,
        description: 'To switch organizations again, use the organization switcher in the menu bar.'
      });
    } else if ((this.props.requestingSwitchOrganization && !nextProps.requestingSwitchOrganization) && nextProps.switchOrganizationError) {
      notification.error({
        message: `Error`,
        description: 'Could not switch organizations. Try again later.'
      });
    }

    if (nextProps.requestingSwitchOrganization) {
      this.setState({
        switchedOrganization: false,
      });
    }
  }
  render() {
    const dropdown = () => {
      const organization = this.props.user.currentOrganization;
      const organizations = this.props.user.organizations;

      const list = [];

      for (let i = 0; i < organizations.length; i++) {
        const item = (
          <Menu.Item key={organizations[i].id}>
            {organizations[i].label}
          </Menu.Item>
        );

        list.push(item);
      }

      return list;
    }

    const menu = (
      <Menu onClick={this.handleMenu}>
        <Menu.Item key={`/app/user/${this.props.user.id}`}>
          <Icon type="solution" />
          <span className={classes.dropdownText}>Profile</span>
        </Menu.Item>

        <SubMenu title={<span><Icon type="reload" /><span className={classes.dropdownText}>Switch Organizations</span></span>}>
          {dropdown()}
        </SubMenu>

        <Menu.Item key="logout">
          <Icon type="logout" />
          <span className={classes.dropdownText}>Logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Notifications loading={this.props.loading} />
        <Sidebar {...this.props} active={this.state.active} />
        <Layout>
          <Layout.Header style={{ background: '#fff' }}>
            <p className={classes.sidebarContainerHeader}>{this.props.header}</p>

            <div className={classes.sidebarContainerHeaderRight}>
              {this.props.right}
              <Badge count={0} showZero style={{ display: 'inline-block' }}>
                <Icon type="bell" style={{ marginLeft: '20px' }}/>
              </Badge>

              <Avatar type="user" style={{ display: 'inline-block', marginLeft: '30px' }} />
              <Dropdown overlay={menu} style={{ display: 'inline-block', marginLeft: '30px' }} >
                <a className="ant-dropdown-link" target="_blank" style={{ marginLeft: '10px', color: 'black' }}>
                  {this.props.user.firstName} <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Layout.Header>
          <Layout.Content style={{ margin: '0 16px', paddingTop: '25px', paddingLeft: '30px', paddingRight: '30px' }}>
            {this.props.children}
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Hello from Richardson.
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  requestingSwitchOrganization: state.user.switchOrganization.requesting,
  switchOrganization: state.user.switchOrganization.user,
  switchOrganizationError: state.user.switchOrganization.error,
});

const actionCreators = {
  ...routerActions,
  ...authentication,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarPage);

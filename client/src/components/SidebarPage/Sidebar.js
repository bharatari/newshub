import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';
import { configuration } from 'constants/routes';
import access from 'utils/access';
import { Menu, Icon, Layout } from 'antd';

export default class Sidebar extends React.Component {
  static propTypes = {
    currentUrl: PropTypes.string,
    actions: PropTypes.object,
    user: PropTypes.object,
    roles: PropTypes.array.isRequired,
  };
  state = {
    collapsed: true,
  };
  currentRoute = (url) => {
    if (url === this.props.currentUrl) {
      return true;
    } else {
      return false;
    }
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  handleClick = (item, key, keyPath) => {
    this.props.actions.push(item.key);
  };
  render() {
    const getRoutes = () => {
      let routes = [];

      configuration.routes.forEach((route) => {
        const role = access.getRole(route.url);

        if (route.sidebar) {
          if (access.has(this.props.roles, role)) {            
            if (this.currentRoute(route.url)) {

            }

            routes.push(
              <Menu.Item key={route.url}>
                <Icon type={route.icon} />
                <span>{route.label}</span>
              </Menu.Item>
            );
          }
        }
      });
      
      return routes;
    }
    
    const organization = this.props.user.currentOrganization;

    return (
      <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu mode="inline" theme="dark" onClick={this.handleClick}>
          {getRoutes()}
        </Menu>
      </Layout.Sider>
    )
  }
};

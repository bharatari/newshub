import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { defaultRedirect } from 'constants/keys';
import { routerActions } from 'react-router-redux';
import authenticated from './Authenticated';
import { Unauthorized } from 'components/';
import * as role from 'modules/role/actions';
import utils from 'utils/access';

export default function access(Component) {
  class AccessComponent extends React.Component {
    state = {
      authorized: false,
    };
    componentWillMount() {
      if (!this.props.roles) {
        this.props.actions.fetchRoles();
      } else {
        const role = utils.getRole(this.props.url);

        this.setState({ authorized: utils.has(this.props.roles, role) });
      }
    }
    componentWillReceiveProps(nextProps) {
      if (!nextProps.requesting && nextProps.roles) {
        const role = utils.getRole(nextProps.url);

        this.setState({ authorized: utils.has(nextProps.roles, role) });
      }
    }
    render() {
      const displayUnauthorized = !this.props.requesting && this.props.roles && !this.state.authorized;
      const display = !this.props.requesting && this.props.roles && this.state.authorized;

      const show = () => {
        if (displayUnauthorized) {
          return <Unauthorized />;
        } else if (display) {
          return this.props.children;
        } else {
          return null;
        }
      };

      return show();
    }
  }
  
  const mapStateToProps = (state, ownProps) => ({
    location: ownProps.location,
    url: ownProps.location.pathname,
    requestingRole: state.role.fetchRoles.requesting,
    roles: state.role.fetchRoles.roles,
  });

  const actionCreators = {
    ...routerActions,
    ...role,
  }

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(AccessComponent);
}

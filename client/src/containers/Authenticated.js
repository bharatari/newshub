import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authentication from 'modules/authentication/actions';
import * as user from 'modules/user/actions';
import { loginRedirect } from 'constants/keys';
import { routerActions } from 'react-router-redux';
import _ from 'lodash';

export default function authenticated(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      actions: PropTypes.shape({
        fetchCurrentUser: PropTypes.func,
        replace: PropTypes.func,
      }).isRequired,
      requestingUser: PropTypes.bool.isRequired,
      user: PropTypes.object,
    };
    state = {
      requestedLogin: false,
      requestedLogout: false,
    };
    componentWillMount() {
      this.props.actions.fetchCurrentUser();
    }
    componentWillReceiveProps(nextProps) {
      if (!nextProps.requestingUser && (!nextProps.user || _.isError(nextProps.user))) {
        if (nextProps.currentRoute !== loginRedirect) {
          if (!this.state.requestedLogin) {
            this.props.actions.replace(loginRedirect + '?next=' + nextProps.currentRoute);

            this.setState({
              requestedLogin: true,
            });
          }
        }
      }

      if (nextProps.logout && (nextProps.currentRoute !== loginRedirect)) {
        if (!this.state.requestedLogout) {
          this.props.actions.replace(loginRedirect);

          this.setState({
            requestedLogout: true,
          });
        }
      }
    }
    render() {
      return (
        <div>
          {
            this.props.user
            ? <Component user={this.props.user} {...this.props} />
            : null
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    requestingUser: state.user.fetchCurrentUser.requesting,
    user: state.user.fetchCurrentUser.user,
    currentRoute: ownProps.location.pathname,
    logout: state.authentication.logout,
    roles: state.role.fetchRoles.roles,
  });

  const actionCreators = {
    ...routerActions,
    ...authentication,
    ...user,
  };

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

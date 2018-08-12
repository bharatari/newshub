import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as user from 'modules/user/actions';
import { defaultRedirect } from 'constants/keys';
import { routerActions } from 'react-router-redux';
import _ from 'lodash';

export default function unauthenticated(Component) {
  class UnauthenticatedComponent extends React.Component {
    componentWillMount() {
      this.props.actions.fetchCurrentUser();
    }
    componentWillReceiveProps(nextProps) {
      if (!nextProps.requestingUser && (nextProps.user && !_.isError(nextProps.user))) {
        this.props.actions.replace(defaultRedirect);
      }
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  
  const mapStateToProps = (state) => ({
    requestingUser: state.user.fetchCurrentUser.requesting,
    user: state.user.fetchCurrentUser.user,
  });

  const actionCreators = {
    ...routerActions,
    ...user,
  }

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(UnauthenticatedComponent);
}

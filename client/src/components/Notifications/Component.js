import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Notification from './Notification';
import Loading from './Loading';
import classes from './Styles.scss';
import classNames from 'classnames';
import * as notificationsActions from 'modules/notifications/actions';
import { TransitionGroup } from 'react-transition-group';

const notifications = classNames(
  classes.notifications
);

class Notifications extends React.Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
  };
  state = {
    loading: this.props.loading,
  };
  componentWillReceiveProps(nextProps) {
    this.state.loading = nextProps.loading;
  }
  closeNotification = (id) => {
    this.props.actions.removeNotification(id);
  };
  render() {
    const notification = (notification) => {
      return <Notification key={notification.id} notification={notification} closeNotification={this.closeNotification} />
    };

    return (
      <ul className={notifications}>
        <Loading display={this.state.loading} />
        {this.props.notifications.map(notification)}
      </ul>
    );
  }
}


const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
});

const actionCreators = {
  ...notificationsActions,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

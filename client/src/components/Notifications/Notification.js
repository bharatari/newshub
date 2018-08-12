import React from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

const icon = classNames(
  classes.notificationClose,
  'close icon'
);

export default class Notification extends React.Component {
  state = {
    in: true,
  };
  closeNotification = () => {
    this.setState({
      in: false,
    });
  };
  render() {
    return (
      <CSSTransition
        in={this.state.in}
        unmountOnExit={true}
        key={this.props.notification.id}
        classNames="notification"
        appear={true}
        timeout={{ enter: 500, exit: 500 }}
        onExited={() => {
          this.props.closeNotification(this.props.notification.id);
        }}>
        <li className={classes.notification}>
          <div>
            <i className={icon} onClick={this.closeNotification}></i>
            <p className={classes.notificationHeader}>{this.props.notification.title}</p>
            <p className={classes.notificationText}>{this.props.notification.body}</p>
          </div>
        </li>
      </CSSTransition>
    );
  }
}

import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { message } from 'antd';

const spinner = classNames(
  'ui active inverted inline loader',
  classes.loadingSpinner
);

export default class Loading extends React.Component {
  static propTypes = {
    display: PropTypes.bool,
  };
  state = {
    display: this.props.display,
    hide: null,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.display) {
      const hide = message.loading('Loading...', 0);

      this.setState({
        hide,
      });
    } else {
      if (this.state.hide) {
        this.state.hide();
      }

      this.setState({
        hide: null,
      });
    }
  };
  render() {
    return (
      <div></div>
    );
  }
}

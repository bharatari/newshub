import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';

export default class Type extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };
  render() {
    const { type } = this.props.data;

    if (type === 'clock-in') {
      return (
        <span className={classes.text}>
          Clock In
        </span>
      );
    } else {
      return (
        <span className={classes.text}>
          Clock Out
        </span>
      );
    }
  }
}

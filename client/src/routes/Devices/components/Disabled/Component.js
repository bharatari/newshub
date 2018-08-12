import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import _ from 'lodash';

export default class Status extends React.Component {
  render() {
    const disabled = _.get(this.props.data, 'disabled');
    const name = _.get(this.props.data, 'name');

    let styles;
    if (disabled) {
      styles = {
        color: 'rgba(255, 102, 102, 1)',
      };
    } else {
      styles = {};
    }

    return (
      <span className={classes.text} style={styles}>
        {name}
      </span>
    );
  }
}

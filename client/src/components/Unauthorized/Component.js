import React from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';

const icon = classNames(
  'ion-lock-combination',
  classes.icon
);

export default class Unauthorized extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <i className={icon}></i>
        <h1 className={classes.header}>Nothing to see here...</h1>
        <p className={classes.text}>Only admins are allowed on this page.</p>
      </div>
    );
  }
}

import React from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';

const icon = classNames(
  'ion-map',
  classes.icon
);

export default class NotFoundView extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className={classes.container}>
          <i className={icon}></i>
          <h1 className={classes.header}>Looks like you're lost.</h1>
          <p className={classes.text}>We couldn't find that page for you.</p>
        </div>
      </div>
    );
  }
}

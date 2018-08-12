import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import reservation from 'modules/reservation/utils';

export default class Status extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };
  render() {
    let color;
    let status;
    let style;

    if (this.props.data) {
      color = reservation.getReservationColor(this.props.data);
      status = reservation.getReservationStatus(this.props.data);
      style = {
        color,
      };
    }

    return (
      <span className={classes.text} style={style}>
        {status}
      </span>
    );
  }
}

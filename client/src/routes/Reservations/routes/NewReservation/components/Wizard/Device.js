import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';
import { Button } from 'antd';

export default class Device extends React.Component {
  static propTypes = {
    device: PropTypes.object.isRequired,
  };
  add = (e) => {
    let device = this.props.device;

    if (this.props.device.availableQuantity > this.props.device.reservedQuantity) {
      device.reservedQuantity++;
    }

    this.props.onChange(device);
  };
  subtract = () => {
    let device = this.props.device;

    if (this.props.device.reservedQuantity > 1) {
      device.reservedQuantity--;
    }

    this.props.onChange(device);
  };
  remove = () => {
    this.props.remove(this.props.device.id);
  };
  render() {
    return (
      <div className={classes.reservationDevice}>
        <p className={classes.reservationDeviceLabel}>{this.props.device.label}</p>
        <Button type="primary" shape="circle" icon="plus" onClick={this.add} />
        <span className={classes.reservationDeviceQuantity}>{this.props.device.reservedQuantity}</span>
        <Button shape="circle" icon="minus" onClick={this.subtract} />
        <Button className={classes.delete} type="danger" shape="circle" icon="delete" onClick={this.remove} ghost />
      </div>
    )
  }
}

import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

export default class Devices extends React.Component {
  static propTypes = {
    devices: PropTypes.array,
  };
  render() {
    const renderDevices = () => {
      const list = [];

      this.props.devices.map((device) => {
        list.push(
          <div className={classes.device} key={device.id}>
            <p className={classes.content}>{device.label}</p>
            <p className={classes.name}>{device.name}</p>
            <span className={classes.quantityHeader}>
              Quantity <span className={classes.quantity}>{device.reservation_devices.quantity}</span>
            </span>
            <p className={classes.barcode}><i className="barcode icon"></i>{device.barcode}</p>
          </div>
        );
      });

      return list;
    };

    return (
      <div className={classes.devices}>
        {renderDevices()}
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

const prompt = classNames(
  classes.barcodeField,
  'prompt'
);

export default class Barcode extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.device.requesting && !this.props.device.device) {
      if (!nextProps.device.requesting && nextProps.device.device) {
        this.props.onChange(nextProps.device.device);
      }
    }
  }
  handleChange = (e) => {
    this.props.actions.resetFetchDevice();

    this.props.actions.fetchDeviceByBarcode(e.target.value);
  };
  render() {
    const container = classNames(
      'ui search',
      classes.barcodeContainer,
      { 'loading': this.props.device.requesting },
    );

    return (
      <div className={container}>
        <div className="ui icon input">
          <input name="barcode" className={prompt} type="text" onChange={this.handleChange} placeholder="Click to add by barcode" />
          <i className="barcode icon"></i>
        </div>
      </div>
    );
  }
}

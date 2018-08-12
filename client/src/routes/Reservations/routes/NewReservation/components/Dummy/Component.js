import React, { PropTypes } from 'react';

export default class Dummy extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    remainingDevices: PropTypes.object,
    selectedDevices: PropTypes.array,
  };
  componentDidMount() {
    this.props.onChange(this.props.selectedDevices);
  }
  componentWillReceiveProps(nextProps) {
    this.props.onChange(nextProps.selectedDevices);
  }
  render() {
    return null;
  }
}

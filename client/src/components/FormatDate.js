import React, { PropTypes } from 'react';
import moment from 'moment';

export default class FormatDate extends React.Component {
  static propTypes = {
    date: PropTypes.any,
    datetime: PropTypes.any,
    format: PropTypes.string,
  };
  format = () => {
    if (this.props.format) {
      return this.formatDynamic();
    } else if (this.props.date) {
      return this.formatDate();
    } else if (this.props.datetime) {
      return this.formatDateTime();
    }

    return '';
  };
  formatDynamic = () => {
    return moment(this.props.datetime).format(this.props.format);
  };
  formatDate = () => {
    return moment(this.props.date).format("MM/DD/YY");
  };
  formatDateTime = () => {
    return moment(this.props.datetime).format("MM/DD/YY h:mm a");
  };
  render() {
    return (
      <span>{this.format()}</span>
    );
  }
};

import Datetime from 'react-datetime';
import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import { DatePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash';

export default class Card extends React.Component {
  handleBlur = (date) => {
    this.props.onBlur(moment(date).toISOString());
  };
  handleFocus = (e) => {
    this.props.onFocus(e);
  };
  handleChange = (date) => {
    this.props.onChange(moment(date).toISOString());
    this.props.onFocus(moment(date).toISOString());
    this.props.onBlur(moment(date).toISOString());
  };
  render() {
    let value = this.props.value;

    if (!_.isEmpty(value)) {
      value = moment(value);
    } else {
      value = null;
    }

    return (
      <DatePicker value={value} format="MM-DD-YYYY hh:mm a" onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} showTime={true} />
    );
  }
}

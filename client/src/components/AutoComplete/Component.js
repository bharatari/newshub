import Datetime from 'react-datetime';
import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import { AutoComplete as Complete } from 'antd';
import moment from 'moment';
import _ from 'lodash';

const Option = Complete.Option;

export default class AutoComplete extends React.Component {
  handleSearch = (value) => {
    this.props.onSearch(value);
  };
  handleChange = (value) => {
    this.props.onChange(value);
    this.props.onFocus(value);
    this.props.onBlur(value);
  };
  render() {
    const { data, placeholder, value } = this.props;

    let children = null;

    if (data) {
      children = data.map((object) => {
        return <Option key={object[this.props.uniqueKey]}>{object[this.props.labelKey]}</Option>;
      });
    }

    return (
      <Complete value={value} dataSource={data} onChange={this.handleChange} children={children} onSearch={this.handleSearch} placeholder={placeholder} />
    );
  }
}

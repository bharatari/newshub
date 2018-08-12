import Datetime from 'react-datetime';
import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import { Radio as RadioComponent } from 'antd';

const Group = RadioComponent.Group;
const Button = RadioComponent.Button;

export default class Radio extends React.Component {
  handleChange = (e) => {
    this.props.onChange(e);
    this.props.onFocus(e);
    this.props.onBlur(e);
  };
  render() {
    const { data, value } = this.props;

    let children = null;

    if (data) {
      children = data.map((object) => {
        return <Button key={object.key} value={object.key}>{object.label}</Button>;
      });
    }

    return (
      <Group onChange={this.handleChange} value={value}>
        {children}
      </Group>
    );
  }
}

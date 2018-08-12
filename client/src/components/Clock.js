import React, { PropTypes } from 'react';
import moment from 'moment';

export default class Clock extends React.Component {
  state = {
    time: moment().format("hh:mm A"),
  };
  tick = () => {
    this.setState({
      time: moment().format("hh:mm A"),
    });
  };
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <span>{this.state.time}</span>
    );
  }
};

import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Content } from '../';

export default class ModalContent extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };
  render() {
    return (
      <div>
        { this.props.data ? <Content reservation={this.props.data} /> : null }
      </div>
    );
  }
}

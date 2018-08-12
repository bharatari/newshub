import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Modal as AntModal } from 'antd';

export default class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    cancelText: PropTypes.string,
    confirmationText: PropTypes.string,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
  };
  render() {
    return (
      <AntModal
        title={this.props.title}
        visible={this.props.visible}
        okText={this.props.okText}
        cancelText={this.props.cancelText}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
      >
        {this.props.children}
      </AntModal>
    );
  }
}

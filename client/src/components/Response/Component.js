import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import errors from 'utils/errors';
import { Alert } from 'antd';
import * as authentication from 'modules/authentication/actions';

export default class Response extends React.Component {
  static propTypes = {
    error: PropTypes.any,
    response: PropTypes.any,
  };
  errorText = () => {
    if (this.props.errorText) {
      return this.props.errorText;
    } else {
      return errors.getError(this.props.error.message).text;
    }
  };
  errorHeader = () => {
    if (this.props.errorHeader) {
      return this.props.errorHeader;
    } else {
      return errors.getError(this.props.error.message).header;
    }
  };
  render() {
    if (this.props.error) {
      return (
        <Alert message={this.errorHeader()} description={this.errorText()} type="error" showIcon />
      );
    } else if (this.props.response) {
      return (
        <Alert message={this.props.successHeader} description={this.props.successText} type="success" showIcon />
      );
    }

    return null;
  }
}

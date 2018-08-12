import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Response } from 'components/';
import { Form } from './components';

const main = classNames(
  'twelve wide phone eight wide tablet four wide computer column',
  classes.main
);

export default class ResetPasswordView extends React.Component {
  static propTypes = {
    requestingLogin: PropTypes.bool,
    error: PropTypes.any,
    response: PropTypes.any,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.createToken({
      email: values.email,
    });
  };
  render() {
    return (
      <div className={classes.background}>
        <div className="ui container">
          <div className="ui middle aligned center aligned grid">
            <div className={main}>
              <h2 className={classes.header}>Reset Password</h2>
              <p className={classes.text}>Enter the email address associated with your account and we'll send you an email with a reset link</p>
              <Response error={this.props.error} response={this.props.response}
                successHeader="Check your email" successText="You'll find your password reset link there" />
              <Form onSubmit={this.handleSubmit} requesting={this.props.requestingCreateToken}
                actions={this.props.actions} response={this.props.response} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

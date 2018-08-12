import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import authentication from 'modules/authentication/utils';
import { Form, Icon, Button } from 'antd';
import { Input } from 'components/';

class LoginForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    requestingLogin: PropTypes.bool.isRequired,
  };
  handleClick = () => {
    this.props.actions.push('/app/signup');
  };
  handleResetPassword = () => {
    this.props.actions.push('/app/reset-password');
  };
  render() {
    const { handleSubmit, pristine, reset, submitting, requestingLogin } = this.props;

    return (
      <Form onSubmit={handleSubmit} className={classes.form}>
        <Field name="email" type="text" placeholder="Email" component={Input} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} />
      
        <Field name="password" type="password" placeholder="Password" component={Input}  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} />

        <Button type="primary" htmlType="submit" className={classes.login} loading={requestingLogin} disabled={this.props.requestingLogin || this.props.response}>
          Log In
        </Button>

        <Button type="default" onClick={this.handleResetPassword} className={classes.reset}>
          Reset Password
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'login',
  validate: authentication.validateLogin,
})(LoginForm);

import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import utils from '../../modules/utils';

const renderField = ({ input, type, placeholder, icon, meta: { touched, error }}) => (
  <div className="field">
    <div className="ui left icon input">
      <i className={icon}></i>
      <input {...input} type={type} placeholder={placeholder} />
    </div>
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </div>
);

class ResetPasswordTokenForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    requesting: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting, requesting } = this.props;
    const button = classNames(
      'ui fluid large black submit button button-light',
      classes.button,
      { loading: requesting }
    );

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <Field name="email" type="text" placeholder="Email" icon="user icon" component={renderField} />
        <Field name="password" type="password" placeholder="Password" icon="key icon" component={renderField} />
        <Field name="confirmPassword" type="password" placeholder="Confirm Password" icon="key icon" component={renderField} />
        <button type="submit" className={button}
          disabled={this.props.requesting || this.props.response}>
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'resetPasswordToken',
  validate: utils.validateResetPassword,
})(ResetPasswordTokenForm);

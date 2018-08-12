import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'antd';
import { Input } from 'components/';

class AdminNotesForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field name="adminNotes" type="textarea" component={Input} />
      </Form>
    );
  }
}

export default reduxForm({
  form: 'reservation',
})(AdminNotesForm);



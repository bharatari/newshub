import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'antd';
import { Input, DateTime } from 'components/';
import utils from '../../../../modules/utils';

class LogForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting, labelKey, users, onSearch, uniqueKey } = this.props;

    const options = [
      { key: 'clock-in', label: 'Clock In' },
      { key: 'clock-out', label: 'Clock Out' }
    ];
  
    return (
      <Form onSubmit={handleSubmit}>
        <Field name="targetUserId" type="autocomplete" data={users} onSearch={onSearch} labelKey={labelKey} uniqueKey={uniqueKey} component={Input} placeholder="Type user's name" />
        <Field name="type" type="radiogroup" data={options} component={Input} />
        <Field name="date" type="datetime" component={Input} />
      </Form>
    );
  }
}

export default reduxForm({
  form: 'log',
  validate: utils.validateManualLog,
})(LogForm);

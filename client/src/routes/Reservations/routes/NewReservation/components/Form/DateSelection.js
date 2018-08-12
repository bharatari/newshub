import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import reservation from 'modules/reservation/utils';
import { Input } from 'components/';
import { Button, Form } from 'antd';

class DateSelection extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="ui form">
        <Field name="startDate" label="Start Date" type="datetime" component={Input} />
        <Field name="endDate" label="End Date" type="datetime" component={Input} />
   
        <Button type="primary" htmlType="submit">Next</Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'newReservation',
  validate: reservation.validateNewReservation,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(DateSelection);

import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import reservation from 'modules/reservation/utils';
import { Form, Button } from 'antd';
import { Input } from 'components/';

class Details extends React.Component {
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
        <Field name="purpose" type="text" label="Purpose" component={Input} />
        <Field name="notes" type="text" label="Additional Details" component={Input} />
        
        <Button.Group>
          <Button onClick={this.props.previous}>Previous</Button>
          <Button type="primary" htmlType="submit">Next</Button>
        </Button.Group>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'newReservation',
  validate: reservation.validateNewReservation,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Details);

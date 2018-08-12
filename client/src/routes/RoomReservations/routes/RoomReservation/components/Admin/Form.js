import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';

const button = classNames(
  'ui button blue button-light',
  classes.marginTop
);

class ReservationForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <p className={classes.header}>Admin Notes</p>
        <Field name="adminNotes" component="textarea"
          placeholder="Update admin notes here" className={classes.font} />
        <button className={button} type="submit">UPDATE</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'reservation',
})(ReservationForm);

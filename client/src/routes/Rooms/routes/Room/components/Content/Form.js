import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const button = classNames(
  'ui button blue button-light',
  classes.button
);

const renderField = ({ input, meta: { touched, error }}) => (
  <div className="field">
    <div className="ui checkbox">
      <input className={classes.font} type="checkbox" tabIndex="0" className="hidden" {...input} />
      <label>Disable Room</label>
    </div>
  </div>
);

class RoomForm extends React.Component {
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
        <p className={classes.header}>Name</p>
        <Field name="name" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Label</p>
        <Field name="label" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Description</p>
        <Field name="description" component="textarea" className={classes.font} />
        <p className={classes.header}>Capacity</p>
        <Field name="label" component="input" type="number" className={classes.font} />
        <p className={classes.header}>Disabled</p>
        <Field name="disabled" component={renderField} type="checkbox" className={classes.font} />
        <button className={button} type="submit">UPDATE</button>
      </form>
    );
  }
}

RoomForm = reduxForm({
  form: 'room',
})(RoomForm);

RoomForm = connect(
  state => ({
    initialValues: state.room.fetchRoom.room,
  }),
)(RoomForm);

export default RoomForm;

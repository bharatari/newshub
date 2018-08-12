import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import room from 'modules/room/utils';

const renderField = ({ input, meta: { touched, error }}) => (
  <div className="field">
    <div className="ui checkbox">
      <input className={classes.font} type="checkbox" tabIndex="0" className="hidden" {...input} />
      <label>Disable Room</label>
    </div>
  </div>
);

const renderInput = ({ input, meta: { touched, error }}) => (
  <div>
    <div className="ui input">
      <input {...input} className={classes.font} />
    </div>
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </div>
);

class NewRoomForm extends React.Component {
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
        <div className="field">
          <Field name="name" component={renderInput} type="text" className={classes.font} />
        </div>
        <p className={classes.header}>Label</p>
        <div className="field">
          <Field name="label" component={renderInput} type="text" className={classes.font} />
        </div>
        <p className={classes.header}>Description</p>
        <Field name="description" component="textarea" className={classes.font} />
        <p className={classes.header}>Capacity</p>
        <div className="field">
          <Field name="capacity" component={renderInput} type="number" className={classes.font} />
        </div>
        <p className={classes.header}>Disabled</p>
        <Field name="disabled" component={renderField} type="checkbox" className={classes.font} />
      </form>
    );
  }
}

export default reduxForm({
  form: 'newRoom',
  validate: room.validateNewRoom,
})(NewRoomForm);

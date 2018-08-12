import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import roomReservation from 'modules/roomReservation/utils';
import Select from 'react-select';
import { DateTime } from 'components/';

const formStyles = classNames(
  'ui form',
  classes.bottom
);

const renderField = ({ input, meta: { touched, error }}) => (
  <div>
    <div className="ui input">
      <input {...input} className={classes.font} />
    </div>
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </div>
);

const renderDate = ({ input, meta: { touched, error }}) => (
  <div>
    <DateTime {...input} />
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </div>
);

class NewRoomReservationForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    rooms: PropTypes.array,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting, remainingDevices, selectedDevices } = this.props;
    const renderRoom = ({ input, meta: { touched, error }}) => (
      <div>
        <Select {...input} options={this.props.rooms} className={classes.select}
          onChange={(data) => { input.onChange(data.value) }} />
        {touched && error && <span className={classes.errorText}>{error}</span>}
      </div>
    );

    return (
      <form onSubmit={handleSubmit} className={formStyles}>
        <div className="field">
          <label className={classes.font}>Room</label>
          <Field name="roomId" placeholder="Room" component={renderRoom} />
        </div>
        <div className="field">
          <label className={classes.font}>Start Date</label>
          <Field name="startDate" placeholder="Start Date" component={renderDate} />
        </div>
        <div className="field">
          <label className={classes.font}>End Date</label>
          <Field name="endDate" placeholder="End Date" component={renderDate} />
        </div>
        <div className="field">
          <label className={classes.font}>Purpose</label>
          <Field name="purpose" type="text" component={renderField} />
        </div>
        <div className="field">
          <label className={classes.font}>Additional Notes</label>
          <Field name="notes" type="text" component={renderField} />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newRoomReservation',
  validate: roomReservation.validateNewReservation,
})(NewRoomReservationForm);

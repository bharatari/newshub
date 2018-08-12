import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import reservation from 'modules/reservation/utils';
import { Dummy, Wizard } from '../';
import { Button } from 'antd';

class DeviceSelection extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    remainingDevices: PropTypes.object,
    selectedDevices: PropTypes.array,
  };
  componentDidMount() {
    const { startDate, endDate } = this.props.newReservation.values;

    this.props.localActions.setWizardValue({
      name: 'newReservation',
      key: 'selectedDevices',
      value: [],
    });

    this.props.actions.fetchDevices({
      startDate,
      endDate, 
      disabled: false,
      all: true,
    });
    
    this.props.actions.fetchReservations({
      startDate,
      endDate,
      page: 1,
      disabled: false,
    });
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, remainingDevices, selectedDevices, requestingCreateReservation, createdReservation } = this.props;
    const renderWizard = props => (
      <span>
        <Dummy onChange={props.input.onChange} value={props.input.value}
          remainingDevices={remainingDevices} selectedDevices={selectedDevices} />
        {props.touched && props.error && <span className={classes.errorText}>{props.error}</span>}
      </span>
    );

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <Field name="devices" component={renderWizard} />
        <Wizard {...this.props.wizard} />
        <Button.Group>
          <Button onClick={this.props.previous} disabled={createdReservation}>Previous</Button>
          <Button type="primary" htmlType="submit" loading={requestingCreateReservation} disabled={createdReservation}>Save</Button>
        </Button.Group>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newReservation',
  validate: reservation.validateNewReservation,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(DeviceSelection);

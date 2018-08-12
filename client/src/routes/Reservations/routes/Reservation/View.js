import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Admin, Devices, Content } from './components';

export default class ReservationView extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
    requestingReservation: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.resetUpdateReservation();
    this.props.actions.fetchReservation(this.props.id);
  }
  handleClick = () => {
    this.props.actions.push('/app/reservation/new');
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedReservation && !nextProps.requestingUpdateReservation) {
      if (!this.state.updated) {
        this.props.actions.fetchReservation(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateReservation) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { reservation, requestingReservation, 
            actions, updateError, updatedReservation,
            requestingUpdateReservation, currentUrl, user, roles,
            deleteReservation } = this.props;

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Reservation" loading={requestingReservation || requestingUpdateReservation}
          user={user} roles={roles}>
          <Card column="sixteen">
            <div>
              <Response error={updateError} response={updatedReservation}
                successHeader="Updated." successText="You have successfully updated this reservation." />
              {
                reservation ? 
                <Content reservation={reservation} actions={actions} user={user} roles={roles}
                  deleteReservation={deleteReservation} /> :
                <TextLoading loading={requestingReservation} /> 
              }
            </div>
          </Card>
        </SidebarPage>
      </div>
    );
  }
}

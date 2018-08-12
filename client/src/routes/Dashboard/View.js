import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Clock, Date, Card, Status } from 'components/';
import reservation from 'modules/reservation/utils';
import _ from 'lodash';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class HomeView extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object,
  };
  componentDidMount() {
    this.props.actions.fetchDevices();
    this.props.actions.fetchReservations();
    this.props.actions.fetchUsers();
    this.props.actions.fetchCurrentReservations();
    this.props.actions.fetchUpcomingReservations(); 
  }
  state = {
    fields: [
      { label: 'Name', property: 'user.fullName'},
      { label: 'Start Date', property: 'startDate' , type: 'date' },
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status', component: Status },
    ],
  };
  render() {
    const { requestingCurrent, requestingUpcoming } = this.props;

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="Dashboard" user={this.props.user} loading={requestingCurrent || requestingUpcoming}
          roles={this.props.roles}>
          <div className="ui stackable grid">
            <Card column="four" background="#10cfbd">
              <a href="/app/user" className={classes.statLabel} style={{ color: '#09776d' }}>USERS <i className="chevron circle right icon"></i></a> 
              <h1 className={classes.statText}>{this.props.totalUsers}</h1>
            </Card>
            <Card column="four" background="#ff6a6c">
              <a href="/app/device" className={classes.statLabel} style={{ color: '#963e3f' }}>DEVICES <i className="chevron circle right icon"></i></a>
              <h1 className={classes.statText}>{this.props.totalDevices}</h1>
            </Card>
            <Card column="four" background="#F2711C">
              <a href="/app/reservation" className={classes.statLabel} style={{ color: '#944511' }}>RESERVATIONS <i className="chevron circle right icon"></i></a>
              <h1 className={classes.statText}>{this.props.totalReservations}</h1>
            </Card>
            <Card column="four" background="#2185D0">
              <a href="/app/event" className={classes.statLabel} style={{ color: '#134c77' }}>EVENTS <i className="chevron circle right icon"></i></a>
              <h1 className={classes.statText}>0</h1>
            </Card>
            <Card>
              <p className={classes.day}>
                <Date format="dddd" />
              </p>
              <p className={classes.date}>
                <Date format="MMMM Do YYYY" />
              </p>
            </Card>
            <Card>
              <p className={classes.time}><Clock /></p>
              <p className={classes.mini}>Richardson, TX</p>
            </Card>
            <Card>
              <h1 className={classes.header}>Upcoming Reservations</h1>
              <ReactCSSTransitionGroup
                transitionName="page"
                transitionAppear={true} transitionAppearTimeout={100} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {
                  !_.isEmpty(this.props.upcomingReservations) ?
                  <Table key="content" fields={this.state.fields}
                    data={this.props.upcomingReservations} 
                    actions={this.props.actions} 
                    route="/app/reservation" /> :
                  <p key="empty" className={classes.empty}>Nothing here...</p>
                }
              </ReactCSSTransitionGroup>
            </Card>
            <Card>
              <h1 className={classes.header}>Current Reservations</h1>
              <ReactCSSTransitionGroup
                transitionName="page"
                transitionAppear={true} transitionAppearTimeout={100} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {
                  !_.isEmpty(this.props.currentReservations) ?
                  <Table key="content" fields={this.state.fields}
                    data={this.props.currentReservations} 
                    actions={this.props.actions}
                    route="/app/reservation" /> :
                  <p key="empty" className={classes.empty}>Nothing here...</p>
                }
              </ReactCSSTransitionGroup>
            </Card>
          </div>
        </SidebarPage>
      </div>
    );
  }
}

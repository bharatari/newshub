import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import NotFound from './NotFound/View';
import Root from 'containers/Root';
import Core from './Core/Route';
import Dashboard from './Dashboard';
import Login from './Login/Route';
import Signup from './Signup/Route';
import ResetPassword from './ResetPassword';
import ResetPasswordToken from './ResetPassword/routes/ResetPasswordToken';
import Reservations from './Reservations/Route';
import NewReservation from './Reservations/routes/NewReservation';
import Reservation from './Reservations/routes/Reservation/Route';
import RoomReservations from './RoomReservations/Route';
import NewRoomReservation from './RoomReservations/routes/NewRoomReservation/Route';
import RoomReservation from './RoomReservations/routes/RoomReservation/Route';
import Rooms from './Rooms/Route';
import Room from './Rooms/routes/Room/Route';
import NewRoom from './Rooms/routes/NewRoom/Route';
import Users from './Users/Route';
import NewUser from './Users/routes/NewUser/Route';
import User from './Users/routes/User/Route';
import Devices from './Devices/Route';
import NewDevice from './Devices/routes/NewDevice/Route';
import Device from './Devices/routes/Device/Route';
import Projects from './Projects/Route';
import NewProject from './Projects/routes/NewProject/Route';
import Project from './Projects/routes/Project/Route'
import authenticated from 'containers/Authenticated';
import unauthenticated from 'containers/Unauthenticated';
import admin from 'containers/Admin';
import master from 'containers/Master';

export default (store) => (
  <Route path="/" component={Root}>
    <Route component={authenticated(Core)}>
      <IndexRoute getComponent={Dashboard(store)} />
      <Route path="/app/reservation" component={Reservations} />
      <Route path="/app/reservation/new" getComponent={NewReservation(store)} />
      <Route path="/app/reservation/:id" component={Reservation} />
      <Route path="/app/room-reservation" component={RoomReservations} />
      <Route path="/app/room-reservation/new" component={NewRoomReservation} />
      <Route path="/app/room-reservation/:id" component={RoomReservation} />
      <Route path="/app/room" component={Rooms} />
      <Route path="/app/room/new" component={NewRoomReservation} />
      <Route path="/app/room/:id" component={Room} />
      <Route path="/app/project" component={Projects} />
      <Route path="/app/project/:id" component={Project} />
      <Route component={admin()}>
        <Route path="/app/user/new" component={NewUser} />
      </Route>
      <Route component={master()}>
        <Route path="/app/device/new" component={NewDevice} />
        <Route path="/app/project/new" component={NewProject} />        
      </Route>
      <Route path="/app/user" component={Users} />
      <Route path="/app/user/:id" component={User} />
      <Route path="/app/device" component={Devices} />
      <Route path="/app/device/:id" component={Device} />
    </Route>
    <Route component={unauthenticated(Core)}>
      <Route path="/app/signup" component={Signup} />
      <Route path="/app/login" component={Login} />
    </Route>
    <Route component={Core}>
      <Route path="/app/404" component={NotFound} />
      <Route path="/app/reset-password" getComponent={ResetPassword(store)} />
      <Route path="/app/reset-password/:token" getComponent={ResetPasswordToken(store)} />
    </Route>
    <Redirect from="*" to="/app/404" />
  </Route>
);

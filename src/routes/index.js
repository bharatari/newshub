import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import NotFound from './NotFound/View';
import PageTransition from 'containers/PageTransition';
import Core from './Core/Route';
import Dashboard from './Dashboard/Route';
import Login from './Login/Route';
import Signup from './Signup/Route';
import Reservations from './Reservations/Route';
import NewReservation from './Reservations/routes/NewReservation/Route';
import Reservation from './Reservations/routes/Reservation/Route';
import authenticated from 'containers/Authenticated';
import unauthenticated from 'containers/Unauthenticated';

export default (store) => (
  <Route path="/" component={PageTransition}>
    <Route component={authenticated(Core)}>
      <IndexRoute component={Dashboard} />
      <Route path="/app/reservation" component={Reservations} />
      <Route path="/app/reservation/new" component={NewReservation} />
      <Route path="/app/reservation/:id" component={Reservation} />
    </Route>
    <Route component={unauthenticated(Core)}>
      <Route path="/app/signup" component={Signup} />
      <Route path="/app/login" component={Login} />
    </Route>
    <Route path="/app/404" component={NotFound} />
    <Redirect from="*" to="/app/404" />
  </Route>
);

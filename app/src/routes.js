import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';
import BandBooking from './pages/bandbooking';
import PreviousBands from './pages/previousbands';
import BandDatabase from './pages/banddatabase';
import ProfitCalculator from './pages/profitcalculator';
import BookingCalendar from './pages/bookingcalendar';
import ConcertPage from './pages/concertpage';
import ManagerSite from './pages/manager_site'
import AdminPage from './pages/adminpage';
import Search from './pages/search';
import Login from './pages/login';


const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/bandbooking" component={BandBooking}/>
        <Route path="/previousbands" component={PreviousBands}/>
        <Route path="/banddatabase" component={BandDatabase}/>
        <Route path="/calculator" component={ProfitCalculator}/>
        <Route path="/calendar" component={BookingCalendar}/>
        <Route path="/concerts" component={ConcertPage}/>
        <Route path="/manager" component={ManagerSite}/>
        <Route path="/admin" component={AdminPage}/>
        <Route path="/search" component={Search}/>
        <Route path="/home" component={App}/>
    </Switch>
);

export default Routes;

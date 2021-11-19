import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/Home';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import WeeklyTimeTable from './pages/weekly-timetable/WeeklyTimeTable';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/weekly-timetable">
          <WeeklyTimeTable></WeeklyTimeTable>
        </Route>
        <Redirect to="/weekly-timetable" />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

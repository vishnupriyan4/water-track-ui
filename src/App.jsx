import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { LocalizeProvider } from 'react-localize-redux';
import ParticlesBg from "particles-bg";
import LandingPageComponent from './modules/landing/LandingPage';
import ConsentPageComponent from './modules/registration/ConsentPage';
import HeaderComponent from './modules/header/components/Header';
import { setBlueTheme } from './store/actions/index';
import './App.css';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

function App(props) {
const useStyles = makeStyles({
  paperRoot: { 
    background: `${props.theme.blueTheme ? 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)' : 'none'}`,
    height: '100vh', 
    opacity: 0.9,
    overflow: 'hidden'
  }
})

  const classes = useStyles();

  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 80],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [.1, 0.4],
    position: "all",
    color: ["#1E90FF"],
    cross: "dead",
    random: 15
  };

  return (
    <LocalizeProvider>
      <Paper className={classes.paperRoot}>
      <HeaderComponent />
          <ParticlesBg style={{backgroundColor: 'blue'}} type="custom" config={config} bg={true} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/consent" component={ConsentPageComponent} />
          <Route path="/" component={LandingPageComponent} />
        </Switch>
      </BrowserRouter>
      </Paper>
    </LocalizeProvider>
  );
}

export const mapStateToProps = state => {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps, {
  setBlueTheme
})(App);
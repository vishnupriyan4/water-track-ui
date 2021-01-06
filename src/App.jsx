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
// import FooterComponent from './modules/footer/components/FooterComponent';
import './App.css';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

// const useStyles = makeStyles({
//   paperRoot: {
//     background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)', 
//     height: '100vh', 
//     opacity: 0.9,
//     overflow: 'hidden'
//   }
// })

function App(props) {
  // const resp = async () => {
  //   console.log(process.env.REACT_APP_API_URL)
  //   await axios.get(process.env.REACT_APP_API_URL)
  //     .then(resp=> console.log(resp))
  //     .catch(err => console.error(err));
  // }
  // resp();

//   const testFn = async () => {
//     await axios.get('https://yoyo-gift-301-api.herokuapp.com/').then(resp => 
//     console.log(resp))
// }
console.log('blueTheme', props.theme.blueTheme)
const useStyles = makeStyles({
  paperRoot: {
    // background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)', 
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
    // emitter: "follow",
    random: 15
  };

  // if (Math.random() > 0.85) {
  //   config = Object.assign(config, {
  //     onParticleUpdate: (ctx, particle) => {
  //       ctx.beginPath();
  //       ctx.rect(
  //         particle.p.x,
  //         particle.p.y,
  //         particle.radius * 2,
  //         particle.radius * 2
  //       );
  //       ctx.fillStyle = particle.color;
  //       ctx.fill();
  //       ctx.closePath();
  //     }
  //   });
  // }

  return (
    <LocalizeProvider>
      <Paper className={classes.paperRoot}>
      <HeaderComponent />
          <ParticlesBg style={{backgroundColor: 'blue'}} type="custom" config={config} bg={true} />
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" render={props => {return <LandingPageComponent {...props} />}} /> */}
          <Route exact path="/consent" component={ConsentPageComponent} />
          <Route path="/" component={LandingPageComponent} />
          {/* <Redirect from="/" to="/home" /> */}
        </Switch>
      </BrowserRouter>
      </Paper>
    </LocalizeProvider>
  );
}

// export default App;

export const mapStateToProps = state => {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps, {
  setBlueTheme
})(App);
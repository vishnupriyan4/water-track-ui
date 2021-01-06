import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeComponent from '../home/Home';
import NotificationComponent from '../notifications/Notification';
import SettingsComponent from '../settings/SettingsComponent';
import FooterComponent from '../footer/components/FooterComponent';
import axiosWrapper from '../../apis/axiosCreate';
import { setUserDetails, setJwt } from './state/actions/index';
import { connect } from 'react-redux';
import { setUserIdLocal } from '../registration/state/actions';
import localForage from 'localforage';

const LandingPageComponent = (props) => {

    const [[windowWidth, windowHeight], setWindowSize] = useState([0,0]);

    const getUserDetails = async (id, jwt) => {
        await props.setUserIdLocal(id);
        await props.setJwt(jwt);
        await props.setUserDetails(id, jwt);
        props.history.replace(`/home`);
    }

    useEffect( () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
        localForage.getItem('userAuthId').then(id => {
            if (id) {
                localForage.getItem('jwtToken').then((jwt) => {
                    getUserDetails(id, jwt);
                })
            } else {
                props.history.replace('/consent');
            }
        })

        // localForage.getItem('jwtToken').then(token => console.log("TOKEN", token));
        // if (window.localStorage.getItem('userAuthId')) {
        //     getUserDetails();
        // } else {
        //     props.history.replace('/consent');
        // }
    },[])

    return (
        <>
            <Switch>
                <Route exact path={`/home`} render={props => <HomeComponent windowSize={[windowWidth, windowHeight]} {...props} />} />
                <Route exact path={`/notification`} component={NotificationComponent} />
                <Route exact path={`/settings`} component={SettingsComponent} />
            </Switch>           
            <FooterComponent {...props} />
        </>
    )
}

export const mapStateToProps = state => {
    return {
        userAuthId: state.userAuth.userId
    }
}

export default connect(mapStateToProps,{
    setUserDetails,
    setUserIdLocal,
    setJwt
})(LandingPageComponent);
import React, { useState, useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #1E90FF 30%, #1E90FF 90%)'
    },
    navigation: {
        color: 'white',
        maxWidth: '100%'
    }
})

const FooterComponent = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(1);

    const changeRoute = (event, newValue) => {
        setValue(newValue);
        switch(newValue) {
            case 0 :
                props.history.push('/notification');
                break;
            case 1 :
                props.history.push('/home');
                break;
            case 2 :
                props.history.push('/settings');
                break;
            default :
                break;
        }
    }

    return (
        <BottomNavigation
            style={{position: 'absolute', bottom: 0, width: '100%'}}
            value = {value}
            onChange={(event, newValue) => changeRoute(event, newValue)}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction className={classes.navigation} label="Notifications" icon={<NotificationsActiveIcon />}/>
            <BottomNavigationAction className={classes.navigation} label="Home" icon={<HomeIcon />}/>
            <BottomNavigationAction className={classes.navigation} label="Settings" icon={<SettingsIcon />} />

        </BottomNavigation>
    )
};

export default FooterComponent;
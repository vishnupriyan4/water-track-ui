import React from 'react';
import { makeStyles } from '@material-ui/core';
import loadingLogo from '../../../assets/loading-logo.png'
import './LoadingScreen.css';

const useStyles = makeStyles({
    divStyles: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
});

const LoadingScreenComponent = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.divStyles}>
                <div className="loading-dots"></div>
                <div className="loading-dots"></div>
                <div className="loading-dots"></div>
                <div className="loading-dots"></div>
                <div className="loading-dots"></div>
            </div>
        </>
    )
}

export default LoadingScreenComponent;
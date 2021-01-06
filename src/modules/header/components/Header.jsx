import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Toolbar, Backdrop } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { Modal, Spin } from 'antd';
import { setBlueTheme } from '../../../store/actions/index';
import { setUserDetails } from '../../landing/state/actions/index'
import axiosWrapper from '../../../apis/axiosCreate';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
const webPush = require('web-push');

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)'
    },
    title: {
        flexGrow: 1,
        color: 'white'
    }
}));

const HeaderComponent = (props) => {
    
    const [resetModalStatus, setResetModalStatus] = useState(false);
    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const classes = useStyles();

    function handleThemeChange (event) {
        props.setBlueTheme(!props.theme.blueTheme)
    }

    
    const resetAllWaterEntry = async () => {
        setSpinnerVisible(true)
        await axiosWrapper.put(`/users/waterDetails/manualResetAll`,{}, {headers: {Authorization: `JWT ${props.jwtToken}`}}).then(() => {
            props.setUserDetails(props.userAuthId, props.jwtToken).then(() => {
                setResetModalStatus(false);
                setSpinnerVisible(false);
            })
        })
        // const PUBLIC_VAPID_KEY = 'BGGtv29oPNvkZWamgmzSN3MRCl6n8XyH-K6_JVKXDHwIPbZkjM2p6f9IEELthC8iFVZIdHtWESS1Y0jbbW6zKqc';
        // const PRIVATE_VAPID_KEY = 'JxP6cNzwR4WZ5IB8KAOXxAQWVCUklCxTOXdBRLq2PQA';
        // const WEB_PUSH_CONTACT='mailto: contact@my-site.com';
        // webPush.setVapidDetails(WEB_PUSH_CONTACT, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);
        // const req = {body: {
        //     "subscription" : {
        //         "endpoint" : "https://fcm.googleapis.com/fcm/send/fv2LhB2P6Xk:APA91bF0_M0VMp5f2_3C2puI5y_C05t5sQ6sUXPbqxn-fFNXKZ8pPCjVyJDcDBBMb9gmvOoh092DhNqck4zko1zQb3v78NFv1vcWdKSZH-jaMU1ur-HPf6KQO81VRkX2Ch80H56nEFDm",
        //         "expirationTime" : null,
        //         "keys" : {
        //             "p256dh" : "BE8uUl5lw0m9glIfEbcc58SwodEOJbI65JL8sqecvsgf2qvfjQ6YQdj9op3-fw9tplcRpb2xt5GRQaLsR-NJEi4",
        //             "auth" : "8Rw-RoXJVLPpj31oUnyBrw"
        //         }
        //     }
        // }};
        // const payload = JSON.stringify({
        //     title: "Moodhevi !!",
        //     body: `Hii :) `,
        //     actions: [
        //         {action: 'close', title: 'Close'},
        //     ]
        // })
        // webPush.sendNotification(req.body.subscription, payload)
        //             .then(result => console.log('notification sent'))
        //             .catch(error => console.log(error.stack));
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Water Track
                    </Typography>
                    {(props.jwtToken !== null ? (
                        <div onClick={() => setResetModalStatus(true)} style={{display: 'flex', flexDirection: 'column', marginRight: '10px', alignItems: 'center'}}>
                            <RotateLeftIcon />
                            <span> Reset </span>
                        </div>
                    ) : (<></>))}
                    <Switch
                        checked={props.theme.blueTheme}
                        onChange={handleThemeChange}
                        color="default"
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                </Toolbar>
            </AppBar>
                <Modal 
                    title="Reset Water Entry"
                    visible={resetModalStatus}
                    onOk={() => resetAllWaterEntry()}
                    onCancel={() => setResetModalStatus(false)}
                >
                    <Spin spinning={spinnerVisible} tip="Resetting. Please don't click anywhere">
                        <p> Proceed to reset your water entry ?</p>
                    </Spin>
                </Modal>
        </div>
    )
}

// export default HeaderComponent;

export const mapStateToProps = state => {
    return {
        theme: state.theme,
        jwtToken: state.jwtToken,
        userAuthId: state.userAuthId
    }
}

export default connect(mapStateToProps, {
    setBlueTheme,
    setUserDetails
})(HeaderComponent);
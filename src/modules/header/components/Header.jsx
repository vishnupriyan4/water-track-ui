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
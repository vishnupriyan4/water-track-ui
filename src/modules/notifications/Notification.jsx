import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import SaveIcon from '@material-ui/icons/Save';
import axiosWrapper from '../../apis/axiosCreate';
import { connect } from 'react-redux';
import { Paper, makeStyles, Button } from '@material-ui/core';
import { Spin } from 'antd';
import Fab from '@material-ui/core/Fab';
import { setUserDetails, editUserDetails } from '../landing/state/actions/index';
import { notificationSaveStatusChange } from './store/actions/index';
import './Notifications.css'
import 'antd/dist/antd.css';
import LoadingScreenComponent from '../common/components/LoadingScreen';

const NotificationComponent = (props) => {
    const useStyles = makeStyles({
        containerPaperOverrides: {
            background: 'transparent'
        },
        notificationPaperOverrides: {
            background: 'rgb(255, 255, 255, 0.1)',
            margin: '15px',
        },
        divStyles: {
            overflowY: 'auto',
            overflowX: 'hidden',
            height: `${(window.innerHeight * 78)/ 100}px`
        },
        subHeaderOverrides: {
            flex: 1,
            fontSize: '1.5rem',
            color: `${props.theme.blueTheme ? 'white' : 'none'}`
        },
        listTextOverrides: {
            color: `${props.theme.blueTheme ? 'white' : 'steelblue'}`
        },
        saveButton: {
            marginTop: '10px',
            marginRight: '10px',
        }
    });

    const classes = useStyles();
    const [spinnerVisible, setSpinnerVisible] = useState(false);

    function handleNotificationToggle(ev) {
        const split = ev.target.id.split(' ');
        const userDetails = {...props.userDetails};
        userDetails.userDetails.notificationTimings[+split[1]].skipped = !userDetails.userDetails.notificationTimings[+split[1]].skipped;
        console.log(userDetails);
        props.editUserDetails(userDetails.userDetails);
        props.notificationSaveStatusChange(false);
    }

    function saveNotificationResponses() {
        setSpinnerVisible(true);
        axiosWrapper.put('/users/updateUser/userDetails', {updatedObject: {notificationTimings: props.userDetails.userDetails.notificationTimings}, isFromSettings: false}, {headers: {Authorization: `JWT ${props.jwtToken}`}}).then(() => {
            props.setUserDetails(props.userAuth.userId, props.jwtToken).then(() => {
                props.notificationSaveStatusChange(true);
                setSpinnerVisible(false);
            });
        })
    }

    function timeDeterminer(time) {
        time = `${time.toString()}:00`;
        console.log(time);
        const splitVals = time.split(':');
        let returnTime;
        if (splitVals[0] > 12) {
            splitVals[0] = (+splitVals[0] - 12).toString();
            returnTime = splitVals[0].length === 1 ? `0${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} PM` : `${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} PM`;
        } else if (splitVals[0] < 12) {
            returnTime = splitVals[0].length === 1 ? `0${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} AM` : `${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} AM`;
        } else {
            returnTime = `${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} PM`;
        }
        return returnTime;
    }

    const subHeaderClasses = `${props.theme.blueTheme ? classes.subHeaderOverrides : `${classes.subHeaderOverrides} whiteThemeText`}`;
    const listTextClasses = `${props.theme.blueTheme ? classes.listTextOverrides : `${classes.listTextOverrides} whiteThemeText`}`;

    return (
            props.userDetails.userDetails ? (
                <Paper className={classes.containerPaperOverrides}>
                    <Spin size="large" spinning={spinnerVisible} tip="Saving Changes...">
                    <List subheader={
                        <div style={{display: 'flex'}}>
                            <ListSubheader className={subHeaderClasses}>Notifications</ListSubheader>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              disabled={props.saveButtonDisable}
                              className={classes.saveButton}
                              onClick={saveNotificationResponses}
                              startIcon={<SaveIcon />}
                            >
                              Save
                            </Button>
                        </div>
                    } >
                        <div className={classes.divStyles}>
                        {props.userDetails.userDetails.notificationTimings.map((notification, i) => (
                            <Paper className={classes.notificationPaperOverrides}>
                                <ListItem>
                                  <ListItemIcon>
                                    {notification.skipped ? (
                                        <NotificationsOffIcon className={classes.listTextOverrides} />
                                    ) : (
                                        <NotificationsActiveIcon className={classes.listTextOverrides}/>
                                    )}
                                  </ListItemIcon>
                                  <ListItemText className={listTextClasses} primary={timeDeterminer(notification.time)} />
                                  <ListItemSecondaryAction>
                                    <Switch
                                      edge="end"
                                      color={props.theme.blueTheme ? 'default' : 'primary'}
                                      id={`index ${i}`}
                                      onChange={handleNotificationToggle}
                                      checked={!notification.skipped}
                                    />
                                  </ListItemSecondaryAction>
                                </ListItem>
                            </Paper>
                        ))}
                        </div>
                    </List>
                    </Spin>
                </Paper>
            ) : (
                <LoadingScreenComponent />
            )        
    )
};

export const mapStateToProps = state => {
    return {
        userAuth: state.userAuth,
        userDetails: state.userDetails,
        theme: state.theme,
        saveButtonDisable: state.notificationSaveButton,
        jwtToken: state.jwtToken
    }
}

export default connect(mapStateToProps, {
    setUserDetails,
    editUserDetails,
    notificationSaveStatusChange
})(NotificationComponent);
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Paper, makeStyles, Button } from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import HotelIcon from '@material-ui/icons/Hotel';
import { Fab, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { Build, KeyboardArrowUp } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import FormHandlers from '../registration/constants/formHandlers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Spin } from 'antd';
import { setUserDetails } from '../landing/state/actions/index';
import { connect } from 'react-redux';
import axiosWrapper from '../../apis/axiosCreate';
import LoadingScreenComponent from '../common/components/LoadingScreen';
import WaterLevelDrawer from '../common/components/waterLevelDrawer';
import 'antd/dist/antd.css';

function getWeights() {
    let temp = []
    for (let i=30; i <= 200; i++) {
        temp.push(i);
    }
    return temp;
}

let defaultWaterLevel = 200;
const SettingsComponent = (props) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [formValues, setFormValues] = useState(
        props.userDetails.userDetails ? 
        {wakeUpTime: props.userDetails.userDetails.wakeUpTime, sleepTime: props.userDetails.userDetails.sleepTime, weight: props.userDetails.userDetails.weight} : 
        {wakeUpTime: "07:30", sleepTime: "23:00", weight: 50}
    );
    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [speedDialStatus, setSpeedDialStatus] = useState(false);
    const [waterLevelDrawerStatus, setWaterLevelDrawerStatus] = useState(false);

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
            maxHeight: `${(window.innerHeight * 78)/ 100}px`
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
            marginRight: '10px'
        },
        formFields: {
            width: '30vh'
        },
        formDivs: {
            marginBottom: '25px'
        }
    });

    const saveDialogChanges = () => {
        setSpinnerVisible(true);
        // console.log(formValues);
        const userUpdateDetails = {...props.userDetails.userDetails, weight: formValues.weight, wakeUpTime: formValues.wakeUpTime, sleepTime: formValues.sleepTime};
        console.log(userUpdateDetails);
        axiosWrapper.put('/users/updateUser/userDetails', {updatedObject: userUpdateDetails, isFromSettings: true}, {headers: {Authorization: `JWT ${props.jwtToken}`}})
        .then(() => {
            props.setUserDetails(props.userAuth.userId, props.jwtToken)
            .then(() => {
                setSpinnerVisible(false);
                setDialogOpen(false);
            })
        })
    }

    const handleFormChange = (event) => {
        switch(event.target.id) {
            case FormHandlers.wakeUpTime :
                setFormValues({...formValues, wakeUpTime: event.target.value});
                break;
            case FormHandlers.sleepTime :
                setFormValues({...formValues, sleepTime: event.target.value});
                break;
            default :
                if (event.target.name === FormHandlers.weight) {
                    setFormValues({...formValues, weight: event.target.value});
                }
                break;
        }
    }

    const editDialog = () => {
        return (
            <Dialog open={dialogOpen}  aria-labelledby="form-dialog-title">
                <Spin size="large" tip="Saving Changes..." spinning={spinnerVisible}>
                  <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                  <DialogContent>
                    <div className={classes.formDivs}>
                               <FormControl style={{width: '30vh'}} variant="outlined" className={classes.formControl}>
                                <InputLabel id="weight-label">Weight</InputLabel>
                                <Select
                                  style={{height: "8vh"}}
                                  labelId="weight-label"
                                  name={FormHandlers.weight}
                                  value={formValues.weight}
                                  onChange={handleFormChange}
                                  label="Weight"
                                >
                                  {weights.map(weight => (
                                      <MenuItem value = {weight}> {weight} </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                    </div>
                    <div className={classes.formDivs}>
                        <TextField
                          id={FormHandlers.sleepTime}
                          label="Sleep At"
                          type="time"
                          defaultValue={formValues.sleepTime}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300,
                          }}
                          className={classes.formFields}
                          onBlur={handleFormChange}
                        />
                    </div>
                    <div className={classes.formDivs}>
                        <TextField
                          id={FormHandlers.wakeUpTime}
                          label="Wake Up By"
                          type="time"
                          defaultValue={formValues.wakeUpTime}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300,
                          }}
                          className={classes.formFields}
                          onBlur={handleFormChange}
                        />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={saveDialogChanges} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Spin>
            </Dialog>
        )
    }

    function timeDeterminer(time) {
        console.log(time);
        const splitVals = time.split(':');
        let returnTime;
        if (splitVals[0] > 12) {
            splitVals[0] = (+splitVals[0] - 12).toString();
            returnTime = splitVals[0].length === 1 ? `0${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} PM` : `${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} PM`;
        } else if (splitVals[0] < 12) {
            returnTime = `${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} AM`;
        } else {
            returnTime = `${splitVals[0].slice(-2)}:${splitVals[1].slice(-2)} PM`;
        }
        return returnTime;
    }

    const editActions = [
        { icon: <EditIcon />, name: 'Edit' },
        { icon: <Build />, name: 'Customize' },
    ];

    const handleSpeedDialOpen = () => {
        setSpeedDialStatus(true);
    }

    const handleSpeedDialClose = () => {
        setSpeedDialStatus(false);
    }

    const handleSpeedDialClick = (actionName) => {
        console.log(actionName);
        switch (actionName) {
            case 'Edit' :
                setDialogOpen(true);
                break;
            case 'Customize' :
                setWaterLevelDrawerStatus(true);
                break;
            default :
                break;
        }
    }

    const customContainerSizeSubmit = () => {}
    // let wakeUptime, sleepTime;
    // if (props.userDetails.userDetails) {
    //     wakeUptime = timeDeterminer(props.userDetails.userDetails.wakeUpTime);
    //     sleepTime = timeDeterminer(props.userDetails.userDetails.sleepTime);
    // }

    const classes = useStyles();
    const weights = getWeights();

    const subHeaderClasses = `${props.theme.blueTheme ? classes.subHeaderOverrides : `${classes.subHeaderOverrides} whiteThemeText`}`;
    const listTextClasses = `${props.theme.blueTheme ? classes.listTextOverrides : `${classes.listTextOverrides} whiteThemeText`}`;

    return (
        props.userDetails.userDetails ? (
            //<Paper className={classes.containerPaperOverrides}>
            <>
            <div>
                <List subheader={
                    <div style={{display: 'flex'}}>
                        <ListSubheader className={subHeaderClasses}>Settings</ListSubheader>
                        {/* <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            // disabled={props.saveButtonDisable}
                            className={classes.saveButton}
                            // onClick={saveNotificationResponses}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button> */}
                    </div>
                } >
                    <div className={classes.divStyles}>
                        <Paper className={classes.notificationPaperOverrides}>
                            <ListItem>
                              <ListItemIcon>
                                {/* <NotificationsActiveIcon className={classes.listTextOverrides}/> */}
                                <AccessibilityNewIcon className={classes.listTextOverrides}/>
                              </ListItemIcon>
                              <ListItemText className={listTextClasses} primary="Weight" />
                              <ListItemSecondaryAction>
                                <span className={listTextClasses}>{props.userDetails.userDetails.weight} Kg</span>
                                {/* <EditIcon className={classes.listTextOverrides} /> */}
                              </ListItemSecondaryAction>
                            </ListItem>
                        </Paper>
                        <Paper className={classes.notificationPaperOverrides}>
                            <ListItem>
                              <ListItemIcon>
                                <WbSunnyIcon className={classes.listTextOverrides}/>
                              </ListItemIcon>
                              <ListItemText className={listTextClasses} primary="Wakeup Time" />
                              <ListItemSecondaryAction>
                                <span className={listTextClasses}>
                                    {/* {props.userDetails.userDetails.wakeUpTime} */}
                                    {timeDeterminer(props.userDetails.userDetails.wakeUpTime)}
                                </span>
                                {/* <EditIcon className={classes.listTextOverrides} /> */}
                              </ListItemSecondaryAction>
                            </ListItem>
                        </Paper>
                        <Paper className={classes.notificationPaperOverrides}>
                            <ListItem>
                              <ListItemIcon>
                                <HotelIcon className={classes.listTextOverrides}/>
                              </ListItemIcon>
                              <ListItemText className={listTextClasses} primary="Sleep Time" />
                              <ListItemSecondaryAction>
                                <span className={listTextClasses}>
                                    {timeDeterminer(props.userDetails.userDetails.sleepTime)}
                                </span>
                                {/* <EditIcon className={classes.listTextOverrides} /> */}
                              </ListItemSecondaryAction>
                            </ListItem>
                        </Paper>
                    </div>
                </List>
                <div style={{position: 'absolute', bottom: '60px', width: '100%'}}>
                    {/* <Fab color="primary" aria-label="edit" style={{background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)',float: 'right', marginRight: '10px', marginBottom: '10px'}} onClick={() => setDialogOpen(true)}>
                      <EditIcon />
                    </Fab> */}
                    <SpeedDial
                      style={{ float: 'right', marginRight: '10px', marginBottom: '10px'}}
                      ariaLabel="SpeedDial Settings"
                      FabProps = {{style: {background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)'}}}
                      icon={<SpeedDialIcon icon={<KeyboardArrowUp />} openIcon={<CloseIcon />} />}
                      onClose={handleSpeedDialClose}
                      onOpen={handleSpeedDialOpen}
                      open={speedDialStatus}
                    >
                      {editActions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          tooltipOpen
                          onClick={() => handleSpeedDialClick(action.name)}
                        />
                      ))}
                    </SpeedDial>
                </div>
            </div>
            {editDialog()}
            <WaterLevelDrawer 
                direction="bottom"
                titleText="Add custom container level"
                status={waterLevelDrawerStatus}
                sliderMaxVal={props.userDetails.userDetails.waterLevelPerDay}
                defaultVal={200}
                onChangeFunc={(ev, val) => defaultWaterLevel = val}
                cancelFunc={() => setWaterLevelDrawerStatus(false)}
                submitFunc={() => {
                    window.localStorage.setItem('customizedContainer', defaultWaterLevel);
                    defaultWaterLevel = 200;
                    setWaterLevelDrawerStatus(false);
                }}
            />
            </>
            //</Paper> 
        ) : (
            // <div>
            //     Loading...
            // </div>
            <LoadingScreenComponent />
        )        
)
}

// export default SettingsComponent;

export const mapStateToProps = state => {
    return {
        userAuth: state.userAuth,
        userDetails: state.userDetails,
        theme: state.theme,
        jwtToken: state.jwtToken
    }
}

export default connect(mapStateToProps, {
    setUserDetails
})(SettingsComponent);

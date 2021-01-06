import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axiosWrapper from '../../apis/axiosCreate';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import NoteIcon from '@material-ui/icons/Note';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Fab from '@material-ui/core/Fab';
import StepConnector from '@material-ui/core/StepConnector';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHandlers from './constants/formHandlers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Spin } from 'antd'
import { setUserId } from '../registration/state/actions/index';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
// import {subscribeUser} from '../../subscription';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)',
    },
  },
  completed: {
    '& $line': {
      background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <NoteIcon />,
    2: <LocalDrinkIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paperOverrides: {
    background: 'none',
    padding: '0px',
    paddingTop: '24px'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardOverrides: {
    backgroundColor: 'rgb(255,255,255,0.5)',
    margin: '6%'
  },
  consentDivBorder: {
    borderLeft: 'solid 2px blue'
  },
  consentText: {
    marginLeft: '6px'
  },
  formDivs: {
    paddingLeft: '20%',
    marginBottom: '5%'
  },
  formFields: {
      width: '70%'
  }
}));

function getSteps() {
  return ['Consent', 'Details'];
}

function getWeights() {
    let temp = []
    for (let i=30; i <= 200; i++) {
        temp.push(i);
    }
    return temp;
}

export function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({wakeUpTime: "07:30", sleepTime: "23:00", weight: 50});
  const [askPermission, setAskPermission] = useState(false);
  const [showNotificationDialog, setNotificationDialog] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [showMessageForNext, setShowMessageForNext] = useState(false);
  // const [disableNextButton, setDisableNextButton] = useState(false);
  const steps = getSteps();
  const weights = getWeights();

  const subscribeUser = new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(registration) {
        if (!registration.pushManager) {
          console.log('Push manager unavailable.')
          reject(null);
        }
  
        registration.pushManager.getSubscription().then(function(existedSubscription) {
          if (existedSubscription === null) {
            console.log(`No subscription detected, making request. But ${askPermission} is....`)
            if (askPermission) {
              // setDisableNextButton(true);
              Notification.requestPermission(function(status) {
                console.log('NOti',status);
              })
              
              registration.pushManager.subscribe({
                applicationServerKey: convertedVapidKey,
                userVisibleOnly: true,
              }).then(function(newSubscription) {
                console.log('New subscription added.')
                setSpinnerVisible(false);
              // setDisableNextButton(false);
              setAskPermission(false);
              resolve(newSubscription);
              postFormContent();
            }).catch(function(e) {
              if (Notification.permission !== 'granted') {
                setSpinnerVisible(false);
                if (!showNotificationDialog) {
                  setAskPermission(false);
                  setNotificationDialog(true);
                }
                // setDisableNextButton(false);
                console.log('Permission was not granted.')
              } else {
                setSpinnerVisible(false);
                console.error('An error ocurred during the subscription process.', e)
              }
            })
          }
          } else {
            console.log('Existed subscription detected.')
            // setDisableNextButton(false);
            // setSpinnerVisible(false);
            resolve(existedSubscription);
          }
        })
      })
        .catch(function(e) {
          setSpinnerVisible(false);
          console.error('An error ocurred during Service Worker registration.', e)
        })
    } else {
      reject(null);
      setSpinnerVisible(false);
        console.log('No Service Worker');
    }
  })

  const handleDialogClose = () => {
    setNotificationDialog(false);
  }

  const notificationDialog = () => {
    return (
      <Dialog
      open={showNotificationDialog}
      // onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      {console.log(showNotificationDialog)}
        <DialogTitle id="alert-dialog-title">{"Notifications Blocked ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Oops ! Seems you have blocked the notifications. Enable to continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const postFormContent = () => {
    setAskPermission(true);
    setSpinnerVisible(true);
    subscribeUser.then((subObj) => {
      props.setUserId(formValues, subObj).then(() => {
        setSpinnerVisible(false);
        props.history.push('/');
      });
    }, (err) => {
      console.log(err);
    })
  }

  const handleNext = () => {
      if (activeStep === 0) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        postFormContent();
      }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  return (
      // <Spin spinning={true}>
    <div className={classes.root}>
      <Stepper className={classes.paperOverrides} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {/* <Spin spinning={true}> */}
        <Card className={classes.cardOverrides}>
            <CardActionArea>
              <Spin size="large" spinning={spinnerVisible} tip="Registering">
                {activeStep === steps.length - 1 ? (
                    <>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          About Me
                        </Typography>
                        <div className={classes.formDivs}>
                           <FormControl style={{width: '70%'}} variant="outlined" className={classes.formControl}>
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
                        <div style={{textAlign: 'center'}}>*Allow notifications in next step to continue</div>
                    </CardContent>
                    <CardActions>
                        <Fab onClick={handleBack} color="primary" size="medium" aria-label="add" className={classes.margin}>
                            <NavigateBeforeIcon />
                        </Fab>
                        <Fab onClick={handleNext} style={{marginLeft: 'auto'}} color="primary" size="medium" aria-label="add" className={classes.margin}>
                          <NavigateNextIcon />
                        </Fab>
                    </CardActions>
                  </>
                ) : (
                    <>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Hi,
                        </Typography>
                        <Typography>
                          Add this website as an app to your homescreen (PWA) for better experience.
                        </Typography>
                        <div className={classes.consentDivBorder}>
                            <Typography className={classes.consentText} variant="body2" color="textSecondary" component="p">
                                To provide appropriate water supplement tips for you. We need to get basic data, this information will be kept strictly confidential
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Fab onClick={handleNext} style={{marginLeft: 'auto'}} color="primary" size="medium" aria-label="add" className={classes.margin}>
                          <NavigateNextIcon />
                        </Fab>
                    </CardActions>
                    </>
                )}
                </Spin>
            </CardActionArea>
        </Card>
      </div>
      {notificationDialog()}
    </div>
  );
}

export const mapStateToProps = state => {
  return {
    userDetails: state.userAuth
  }
};

export default connect(mapStateToProps, {
  setUserId
})(CustomizedSteppers);

const convertedVapidKey = urlBase64ToUint8Array('BGGtv29oPNvkZWamgmzSN3MRCl6n8XyH-K6_JVKXDHwIPbZkjM2p6f9IEELthC8iFVZIdHtWESS1Y0jbbW6zKqc')
// const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

import React, { useState } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import AddGlassIcon from '../../icons/addGlass';
import Typography from '@material-ui/core/Typography';
import { Progress } from 'antd';
// import 'antd/dist/antd.css';
import { setUserDetails } from '../landing/state/actions/index';
import TodayWaterList from '../water-list/todayWaterList';
import { connect } from 'react-redux';
import axiosWrapper from '../../apis/axiosCreate';
import LoadingScreenComponent from '../common/components/LoadingScreen';
import WaterLevelDrawer from '../common/components/waterLevelDrawer';
// import {subscribeUser} from '../../subscription';
import { Empty, Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import emptyState from '../../assets/emptyState.png';
import emptyStateWhite from '../../assets/emptyState-white.png';
import 'antd/dist/antd.css';
import './Home.css';

export const HomeComponent = (props) => {
    let waterLevel = window.localStorage.getItem('customizedContainer') ? window.localStorage.getItem('customizedContainer') : 200;
    const useStyles = makeStyles({
        root: {
            margin: '5%',
            marginBottom: '25%'
        },
        paperOverrides: {
            background: 'rgb(255,255, 255, 0.1)',
            borderRadius: '10px',
            perspective: '30vh'
        },
        divStyles: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vh',
            transition: 'transform 1s',
            transformStyle: 'preserve-3d',
            position: 'relative',
            // transform: 'rotateY(180deg)'
        },
        typographyOverrides: {
            textAlign: 'center',
            color: `${props.theme.blueTheme ? 'white' : 'none'}`,
            fontSize: '1.25rem',
        },
        addedDiv: {
            color: 'white'
        },
        fabProgress: {
            color: 'deepskyblue',
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }
    });

    const classes = useStyles();
    const [addedDiv, showAddedDiv] = useState(false);
    const [loadingOnApiCalls, setloadingOnApiCalls] = useState(false);
    const [addWaterDrawerStatus, setAddWaterDrawer] = useState(false);
    const [previousWaterLevelAdded, setPreviousWaterLevelAdded] = useState(0);
    const [windowWidth, windowHeight] = props.windowSize;
    const AddedDivClasses = `added-div-block ${props.theme.blueTheme ? classes.addedDiv : ''}`
    const typographyClasses = `${props.theme.blueTheme ? classes.typographyOverrides : `${classes.typographyOverrides} typographyWhiteOverrides`}`

    const addWaterLevel = async () => {
        // console.log(waterLevel);
        const date = new Date();
        const waterAddDetails = {
            waterLevel: waterLevel,
            time: `${date.getHours()}:${date.getMinutes()}`
        }
        if (!loadingOnApiCalls) {
            setAddWaterDrawer(false);
            setPreviousWaterLevelAdded(waterLevel)
            setloadingOnApiCalls(true);
        }
        showAddedDiv(true);
        setTimeout(() => showAddedDiv(false), 2000);

        await axiosWrapper.put(`/users/updateUser/waterDetails/`, waterAddDetails,  {headers: {Authorization: `JWT ${props.jwtToken}`}} ).then(() => {
            props.setUserDetails(props.userAuthId, props.jwtToken).then(() => {
                setTimeout(() => setloadingOnApiCalls(false), 100);
            }
            );
        })
        .catch(err => console.log(`PUT ERROR, ${err}`))
    }

    let progressContainerDivClasses = `${classes.divStyles}`;

    let currentWaterLevel;

    if (props.userDetails) {
        currentWaterLevel = (props.userDetails.todaysWaterTimeline.reduce((prev, obj) => (+prev) + (+obj.waterLevel), 0));
        if (currentWaterLevel === 0) {
            progressContainerDivClasses = `${classes.divStyles} rotateViewContainer`;
        }
    }
    console.log(loadingOnApiCalls)
    return (
        (props.userDetails) ? (
            <>
            {/* <LinearProgress /> */}
            {/* <Spin spinning={true}>
                <div> */}
                <div className={classes.root}>
                    {/* <Spin spinning={true} size="large" style={{color: 'darkblue'}} indicator={<LoadingOutlined style={{ fontSize: 54 }} />}> */}
                    <Paper elevation={1} className={classes.paperOverrides}>
                        {console.log((windowHeight*30)/100)}
                        <div className={progressContainerDivClasses}>
                            {/* {currentWaterLevel ? ( */}
                                <div className="trans" style={{transform: 'rotateY(0deg)'}}>
                                <Progress
                                  type="circle"
                                  strokeColor={{
                                    '0%': '#4169E1',
                                    '100%': '#87CEFA',
                                  }}
                                //   percent={Math.round(((props.userDetails.todaysWaterTimeline.reduce((prev, obj) => (+prev) + (+obj.waterLevel), 0))*100)/(props.userDetails.waterLevelPerDay) * 10)/10}
                                  percent={Math.round((currentWaterLevel*100)/(props.userDetails.waterLevelPerDay) * 10)/10}
                                />
                                </div>
                              {/* ) : (  */}
                                <div className="trans" style={{transform: 'rotateY(180deg)'}}>
                                <Empty
                                  image={props.theme.blueTheme ? emptyStateWhite : emptyState}
                                  imageStyle={{
                                    height: '20vh',
                                  }}
                                  description={
                                    <span>
                                      Empty <a style={{color: `${props.theme.blueTheme ? 'white' : 'blue'}`}}>Glass</a>
                                    </span>
                                  }
                                >
                                </Empty>
                                </div>
                            {/* )} */}
                        </div>
                        <Typography className={typographyClasses}>{(props.userDetails.todaysWaterTimeline.reduce((prev, obj) => (+prev) + (+obj.waterLevel), 0))}ml of {props.userDetails.waterLevelPerDay}ml</Typography>
                        <TodayWaterList {...props} />
                    </Paper>
                    {/* </Spin> */}
                </div>
                {addedDiv ? (
                    <div className={AddedDivClasses} style={{position: 'absolute', bottom: '120px', display: 'flex', width: '100%', justifyContent: 'center'}}>Added {previousWaterLevelAdded} ml +</div>
                ) : (<> </>)}
                <div style={{position: 'absolute', bottom: '60px', display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <div>

                    <Fab disabled={loadingOnApiCalls} onClick={() => setAddWaterDrawer(true)} style={{background: 'linear-gradient(45deg, #3f51b5 30%, #1E90FF 90%)', color: 'blue'}} aria-label="add">
                      <AddGlassIcon />
                    {loadingOnApiCalls && <CircularProgress size={68} className={classes.fabProgress} />}
                    </Fab>
                    </div>
                </div>
                {/* <div>
                    Loading...
                </div> */}
                {/* </div>
            </Spin> */}
            <WaterLevelDrawer 
                direction= "bottom"
                titleText="Add water intake"
                status={addWaterDrawerStatus}
                sliderMaxVal={props.userDetails.waterLevelPerDay}
                defaultVal={waterLevel}
                onChangeFunc={(ev, val) => waterLevel = val}
                cancelFunc={() => setAddWaterDrawer(false)}
                submitFunc={() => addWaterLevel()}
            />
            </>
        ) : (
            <>
                <LoadingScreenComponent />
            </>
        )
    )
};

export const mapStateToProps = state => {
    return {
        userAuthId: state.userAuth.userId,
        userDetails: state.userDetails.userDetails,
        theme: state.theme,
        jwtToken: state.jwtToken
    }
}

export default connect(mapStateToProps, {
    setUserDetails
})(HomeComponent);
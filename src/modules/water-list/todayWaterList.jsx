import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles, Typography, Grid, Paper, LinearProgress } from "@material-ui/core";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import DeleteIcon from "@material-ui/icons/Delete";
import { Empty, Spin } from "antd";
import { deleteWaterEntry } from "./state/actions/index";
import { setUserDetails } from '../landing/state/actions/index';
import AddGlassIcon from "../../icons/addGlass";
import emptyState from "../../assets/loading-logo.png";
import "antd/dist/antd.css";
import "./todayWaterList.css";
import axiosWrapper from "../../apis/axiosCreate";

// const useStyles = makeStyles({
//     divStyles: {
//         overflowX: 'hidden',
//         overflowY: 'auto',
//         height: '20vh'
//     },
//     paperOverrides: {
//         display: 'flex',
//         background: 'none',
//         justifyContent: 'center'
//     },
//     iconOverrides: {
//         color: 'white'
//     }
// })

const TodayWaterList = (props) => {
  const useStyles = makeStyles({
    divStyles: {
      overflowX: "hidden",
      overflowY: "auto",
      height: "20vh",
    },
    paperOverrides: {
      display: "flex",
      background: "none",
      justifyContent: "center",
    },
    iconOverrides: {
      color: `${props.theme.blueTheme ? "white" : "steelBlue"}`,
    },
    typoGraphyOverrides: {
      color: `${props.theme.blueTheme ? "white" : "none"}`,
      margin: "revert",
      textAlign: "center",
    },
  });

  const classes = useStyles();
  const typoGraphyOverrideClasses = `${
    props.theme.blueTheme
      ? classes.typoGraphyOverrides
      : `${classes.typoGraphyOverrides} typographyWhiteOverrides`
  }`;
  const iconOverrideClasses = `${
    props.theme.blueTheme
      ? classes.iconOverrides
      : `${classes.iconOverrides} iconWhiteOverrides`
  }`;
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  
  const deleteWaterEntry = async (waterId) => {
    setSpinnerVisible(true);
    await axiosWrapper.delete(`/users/updateUser/waterDetailsDelete/`, {headers: {Authorization: `JWT ${props.jwtToken}`}, params: {waterId: waterId}}).then(() => {
        props.setUserDetails(props.userAuthId, props.jwtToken).then(() => {
            setSpinnerVisible(false);
        })
    })
  }
  
  return props.userDetails ? (
    <Spin spinning={spinnerVisible} tip="Deleting..." size="large">
      <Typography className={typoGraphyOverrideClasses}>
        Today's Water Intake
      </Typography>
      <div className={classes.divStyles}>
        <div style={{ padding: "5px" }}>
          {props.userDetails.todaysWaterTimeline.length ? (
            <>
              {props.userDetails.todaysWaterTimeline.map((obj) => (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs>
                      <Paper elevation={0} className={classes.paperOverrides}>
                        <LocalDrinkIcon className={iconOverrideClasses} />
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper elevation={0} className={classes.paperOverrides}>
                        <Typography className={iconOverrideClasses}>
                          {obj.time}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper elevation={0} className={classes.paperOverrides}>
                        <Typography className={iconOverrideClasses}>
                          {obj.waterLevel}(ml)
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper elevation={0} className={classes.paperOverrides}>
                        <DeleteIcon
                          onClick={() =>
                            // props.deleteWaterEntry(props.jwtToken, obj._id)
                            deleteWaterEntry(obj._id)
                          }
                          className={iconOverrideClasses}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </>
              ))}
            </>
          ) : (
            // <Empty
            //   image={emptyState}
            //   imageStyle={{
            //     height: 60,
            //   }}
            //   description={
            //     <span>
            //       {/* Customize <a href="#API">Description</a> */}
            //       Oops! Seems you have'nt had your first glass of water
            //     </span>
            //   }
            // >
            // </Empty>
            <>
              {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}> */}
              {/* Yet to have your first glass of water for today */}
              {/* </div> */}
            </>
          )}
          {/* {props.userDetails.todaysWaterTimeline.map(obj => 
                    <>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Paper elevation={0} className={classes.paperOverrides}>
                                <LocalDrinkIcon className={iconOverrideClasses} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={0} className={classes.paperOverrides}>
                                <Typography className={iconOverrideClasses}>{obj.time}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={0} className={classes.paperOverrides}>
                                <Typography className={iconOverrideClasses}>{obj.waterLevel}(ml)</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={0} className={classes.paperOverrides}>
                                <DeleteIcon onClick={() => props.deleteWaterEntry(props.jwtToken, obj._id)} className={iconOverrideClasses}/>
                            </Paper>
                        </Grid>
                    </Grid>
                    </>
                )} */}
        </div>
      </div>
      {/* Water */}
    </Spin>
  ) : (
    <>Loading</>
  );
};

export const mapStateToProps = (state) => {
  return {
    userAuthId: state.userAuth.userId,
    userDetails: state.userDetails.userDetails,
    theme: state.theme,
    jwtToken: state.jwtToken,
  };
};

export default connect(mapStateToProps, { deleteWaterEntry, setUserDetails })(TodayWaterList);

import React from 'react';
import { Drawer, Slider, withStyles, Button } from '@material-ui/core';

const WaterLevelSlider = withStyles({
    root: {
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const WaterLevelDrawer = (props) => {
    return (
        <Drawer style={{background: 'transparent'}} anchor={props.direction} open={props.status}>
                <div>
                    <span style={{fontSize: 'large'}}>{props.titleText}</span>
                    <div style={{height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <WaterLevelSlider style={{width: "85%"}} onChange={(ev, val) => props.onChangeFunc(ev, val)} max={props.sliderMaxVal} valueLabelDisplay="auto" aria-label="water level slider" defaultValue={props.defaultVal} />
                        <div style={{width: '95%'}}>
                            <span>0ml</span>
                            <Button>+</Button>
                            <span style={{float: 'right'}}>{props.sliderMaxVal}ml</span>
                        </div>
                    </div>
                    <div>
                        <div style={{float: 'right'}}>
                            <Button onClick={() => props.cancelFunc()}>Cancel</Button>
                            <Button onClick={() => props.submitFunc()}>Ok</Button>
                        </div>
                    </div>
                </div>
        </Drawer>
    )
}

export default WaterLevelDrawer;
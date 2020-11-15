/** Handles the displaying of all the StatsPage grid components **/

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import StatsPage from './StatsPage';

const localStyle = makeStyles((theme) => ({
    fixedHeight: {
        height: 510,
    }
}));

export default function Sensors(props) {

    const date = props.location.pathname.split("/")[2];

    let {classes} = props;
    const newClasses = localStyle();
    const fixedHeightPaper = clsx(classes.paper, newClasses.fixedHeight);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Paper className={fixedHeightPaper}>
                    {/* TODO: Put thing here */}
                    <StatsPage watersource="Faucet" title="Upstairs Bathroom Sink" date={date}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={fixedHeightPaper}>
                    {/* TODO: Put thing here */}
                    <StatsPage watersource="Shower" title="Shower" date={date}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={fixedHeightPaper}>
                    {/* TODO: Put thing here */}
                    <StatsPage watersource="Toilet" title="Upstairs Toilet" date={date}/>
                </Paper>
            </Grid>

        </Grid>
    );
}

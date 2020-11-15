// Tells stats for today
import * as React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Today(props) {
    // const {watersource} = props;
    // console.log(watersource);

    const classes = useStyles();
    var today = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = today.getDate() + " " + (months[today.getMonth()]) + ", " + today.getFullYear();

    return (
        <React.Fragment>
            <Title>Total Today</Title>
            <Typography component="p" variant="h4">
                24 Gallons
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on { date }
            </Typography>
            <div>
                <Link color="primary" href={"/stats/" + today.toISOString().slice(0, 10)}>
                    More Details
                </Link>
            </div>
        </React.Fragment>
    );
}

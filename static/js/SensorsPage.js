/** The component inside Sensors.js **/
/** Handles the API request stuff **/
/** Unmount code from: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component **/

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import clsx from 'clsx';

// npm install --save-dev @iconify/react @iconify-icons/mdi
import { Icon, InlineIcon } from '@iconify/react';
import Toilet from '@iconify-icons/mdi/toilet';
import Shower from '@iconify-icons/mdi/shower-head';
import Faucet from '@iconify-icons/mdi/water-pump';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import Stopwatch from './Stopwatch';

const watersourcetypes = {
    'Faucet': Faucet,
    'Shower': Shower,
    'Toilet': Toilet,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class SensorsPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            posts: [],
            watersource: this.props.watersource,
            date: this.props.date,
            status: 'Water Not Running',
            on_iot: false,
        } 
        // this.imageurl = watersourcetypes["Faucet"];
        this.imageurl = watersourcetypes[this.state.watersource];
        this.today = (new Date()).toISOString().slice(0, 10);

        this.changeStatus = this.changeStatus.bind(this)
    }

    changeStatus(isOn) {
        let newStatus = isOn ? "Water Is Running" : "Water Not Running";
        this.setState({
            status: newStatus
        })
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            var faucetstatus = document.getElementById("faucet").innerHTML;
            var showerstatus = document.getElementById("shower").innerHTML;
            var toiletstatus = document.getElementById("toilet").innerHTML;

            console.log("Faucet: " + faucetstatus);
            console.log("Shower: " + showerstatus);
            console.log("Toilet: " + toiletstatus);

        }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timer);

    }

    render() {
        // let {classes} = this.props;
        // const fixedHeightPaper = clsx(classes.paper, newHeight);
        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Title >{this.props.title}</Title>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography component="p" variant="h5" color="textSecondary">{this.props.watersource}</Typography>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon icon={this.imageurl} height="80" />
                </div>

                {/* Stopwatch stuff */}
                <Stopwatch handler={this.changeStatus} on_iot={this.state.on_iot}/>

                {/* <Timer /> */}

                { this.state.status == "Water Not Running" &&
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography component="p"> Status: </Typography>
                    <Typography component="p" style={{color: '#ff1744'}}> {this.state.status}</Typography>
                </div>
                }

                { this.state.status != "Water Not Running" &&
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography component="p"> Status: </Typography>
                        <Typography component="p" style={{color: '#00e676'}}> {this.state.status}</Typography>
                    </div>
                }

                {/* <h1>{`/r/reactjs`}</h1> */}
                {/* <ul> */}
                {/*     {this.state.posts.map(post => */}
                {/*     <li key={post.id}>{post.title}</li> */}
                {/*     )} */}
                {/* </ul> */}
                {/* <h1>{this.state.date}</h1> */}
            </div>
        );
    }
}

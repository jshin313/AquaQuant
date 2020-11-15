/** Displays stopwatch stuff **/
/** Inside the StatsPage component **/

import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';


export default class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            runningTime: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleClick() {
        this.setState(state => {
            if (state.status) {
                clearInterval(this.timer);
            } else {
                const startTime = Date.now() - this.state.runningTime;
                this.timer = setInterval(() => {
                    this.setState({ runningTime: Date.now() - startTime });
                });
            }
            return { status: !state.status };
        });
    }

    handleReset() {
        clearInterval(this.timer);
        this.setState({ runningTime: 0, status: false });
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    render() {
        const { status, runningTime } = this.state;
        const color = status ? "primary": "inherit";
        // console.log()

        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <IconButton onClick={this.handleClick} color={color} aria-label="Stopwatch Button">
                        <AlarmIcon style={{
                            maxWidth: "80px",
                            maxHeight: "80px",
                            minWidth: "80px",
                            minHeight: "80px"
                        }}/>
                    </IconButton>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p>{runningTime} ms</p>
                </div>

                {/* <button onClick={this.handleClick}>{status ? 'Stop' : 'Start'}</button> */}
                {/* <button onClick={this.handleReset}>Reset</button> */}
            </div>
        );
    }
}

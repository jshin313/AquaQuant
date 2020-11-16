/** Displays stopwatch stuff **/
/** Inside the StatsPage component **/
/** Stopwatch code largely from https://wsvincent.com/react-stopwatch/ **/

import React from 'react';

import { spacing } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';

export default class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            runningTime: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleClick() {
        this.setState(state => {
            if (state.status) {
                clearInterval(this.timer);
                this.props.handler();
            } else {
                const startTime = Date.now()/1000.0 - this.state.runningTime;
                this.timer = setInterval(() => {
                    this.setState({ runningTime: (Date.now()/1000.0 - startTime)});
                });
                this.props.handler(!this.state.status);
            }
            return { status: !state.status };
        });
    }

    handleReset() {
        clearInterval(this.timer);
        this.setState({ runningTime: 0, status: false });
        this.props.handler(false);
    }

    handleSave() {
        // TODO: Insert REST call here
        //
        clearInterval(this.timer);
        this.setState({ runningTime: 0, status: false });
        this.props.handler(false);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    render() {
        const { status, runningTime } = this.state;
        const color = status ? "primary": "inherit";

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
                    <Typography component="p" variant="h5" color="textSecondary">{runningTime.toFixed(2)} s</Typography>
                </div>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                        style={{margin: "1rem"}}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={this.handleReset}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{margin: "1rem"}}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={this.handleSave}
                    >
                        Save
                    </Button>
                </div>

            </div>
        );
    }
}

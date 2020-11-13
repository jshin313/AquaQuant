import React, {useCallback} from 'react';
import ReactDOM from 'react-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

import './style.css';
import Highlight from "./Highlight";
import {useHistory} from 'react-router-dom';


const today = new Date();

const StatsTextTypography = withStyles({
    root: {
        // display: 'flex',
        padding: 5, 
    },
})(Typography);

const firstBlue = {
    backgroundColor: '#8cd3ff',
};

const secondBlue = {
    backgroundColor: "#5abcd8",
};

const thirdBlue = {
    backgroundColor: "#2196f3 ",
};

const fourthBlue = {
    backgroundColor: "#1769aa",
};

export default function HeatMap() {
    const randomValues = getRange(350).map(index => {
        let range = 100 - 1;
        const rando = getRandomInt(1, 99);
        var cnt = Math.floor(4 * rando / (range + 1)) + 1;
        return {
            date: shiftDate(today, -index),
            gallons: rando,
            count: cnt,
        };
    });

    const history = useHistory();
    const handleOnClick = useCallback((value) => history.push('/stats/' + value.date.toISOString().slice(0, 10)), [history]);

    return (
        <div>
            <Title>Water Usage This Year</Title>

            <CalendarHeatmap
                startDate={shiftDate(today, -300)}
                endDate={today}
                values={randomValues}
                classForValue={value => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-water-${value.count}`;
                }}
                tooltipDataAttrs={value => {
                    // Temporary hack around null value.date issue
                    if (!value || !value.date) {
                        return null;
                    }
                    return {
                        'data-tip': `On ${value.date.toISOString().slice(0, 10)} you used: ${
              value.gallons
            } gallons.`,
                    };
                }}
                showWeekdayLabels={true}
                onClick={handleOnClick}
            />
            <ReactTooltip />

            <StatsTextTypography component="p" variant="h5" color="textSecondary" >
                You used a total of <Highlight color={fourthBlue}> 12,000 gallons</Highlight> over the year with an average of <Highlight color={secondBlue}> 40 per a day</Highlight>.
            </StatsTextTypography>
            <StatsTextTypography component="p" variant="h5" color="textSecondary" >
                Over the whole year, you used an average of <Highlight color={secondBlue}>280 gallons/week</Highlight>, and <Highlight color={thirdBlue}>1,200 gallons/month</Highlight>.
            </StatsTextTypography>
            <StatsTextTypography component="p" variant="h5" color="textSecondary" >
                Your lowest usage was on <Highlight color={firstBlue}>October 20, 2020</Highlight> with only <Highlight color={firstBlue}>2 gallons</Highlight> used.
            </StatsTextTypography>
            <StatsTextTypography component="p" variant="h5" color="textSecondary" >
                Your highest usage was on <Highlight color={secondBlue}>July 10, 2020</Highlight> with <Highlight color={secondBlue}>90 gallons</Highlight> used.
            </StatsTextTypography>
        </div>
    );
}

function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);


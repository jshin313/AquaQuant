import React from 'react';
import ReactDOM from 'react-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

import './style.css';

const today = new Date();

const StatsTextTypography = withStyles({
    root: {
        display: 'flex',
        padding: 5, 
    },
})(Typography);

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
                    return {
                        'data-tip': `On ${value.date.toISOString().slice(0, 10)} you used: ${
              value.gallons
            } gallons.`,
                    };
                }}
                showWeekdayLabels={true}
                onClick={value => alert(`Clicked on a day with : ${value.gallons} gallons`)}
            />
            <ReactTooltip />

            <StatsTextTypography component="p" variant="h5" color="textSecondary" >
                You used a total of <mark style={fourthBlue}> 12,000 gallons </mark> over the year with an average of <mark style={secondBlue}> 40 per a day</mark>.
            </StatsTextTypography>
            <StatsTextTypography component="p" variant="h5" color="textSecondary" >
                Over the whole year, you used an average of <mark style={secondBlue}>280 gallons/week</mark>, and <mark style={thirdBlue}>1,200 gallons/month</mark>.
            </StatsTextTypography>
            <StatsTextTypography component="p" variant="h5" color="textSecondary" >
                Your lowest usage was on <mark>October 20, 2020</mark> with only <mark>2 gallons</mark> used.
            </StatsTextTypography>
            <StatsTextTypography component="p" variant="h5" color="textSecondary" >
                Your highest usage was on <mark style={secondBlue}>July 10, 2020</mark> with <mark style={secondBlue}>90 gallons</mark> used.
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


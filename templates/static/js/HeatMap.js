import React from 'react';
import ReactDOM from 'react-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import Title from './Title';

import './style.css';

const today = new Date();

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
            {/* <p>Random values with onClick and react-tooltip</p> */}

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


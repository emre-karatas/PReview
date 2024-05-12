import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const PerformanceChart = ({ data }) => {
    const options = {
        title: {
            text: 'Developer Performance'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { month: '%e. %b' },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Score'
            }
        },
        series: [{
            name: 'Score',
            data: data
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PerformanceChart;

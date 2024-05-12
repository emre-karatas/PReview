import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TotalPRChart = () => {
    const options = {
        title: {
            text: 'Total PR'
        },
        yAxis: {
            title: {
                text: 'Number of PR'
            }
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        series: [{
            name: 'PR',
            data: [1, 3, 2, 4, 6, 5]
        }],
        colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default TotalPRChart;

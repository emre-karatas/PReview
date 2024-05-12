import React, {useEffect} from "react";
import Navbar from "./Navbar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";
import "./DeveloperPerformanceDashboard.css"
import Highcharts from 'highcharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from 'react-bootstrap/Accordion';



export const DeveloperPerformanceDashboard = () => {
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
  { field: 'x', headerName: 'Date', width: 130, type: 'Date' },
  { field: 'y', headerName: 'Cost (USD)', width: 130, type: 'number' },
];

const rows = [
    { id: 1, x: new Date('2023-01-01'), y: 1200 },
    { id: 2, x: new Date('2023-01-02'), y: 1500 },
    { id: 3, x: new Date('2023-01-03'), y: 1800 },
    { id: 4, x: new Date('2023-01-04'), y: 1600 },
];

const aiReviews = [
    {
        id: 1,
        date: '2023-01-01',
        comment: "Great implementation of the new caching logic.",
        score: 8.5
    },
    {
        id: 2,
        date: '2023-01-02',
        comment: "Needs improvement in thread safety during cache updates.",
        score: 7.0
    },
    // Add more reviews as needed...
];


const theme = createTheme({
  palette: {
    primary: {
      main: '#2A2C38',
    },
    background: {
      default: '#2A2C38',
      paper: '#f0f0f0',
    },
    text: {
      primary: '#2A2C38',
      secondary: '3',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14,
  },
  components: {

    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
        },
        columnHeader: {
          backgroundColor: '#2A2C38',
          color: '#ffffff',
        },
        row: {
          backgroundColor: '#ffffff',
            color: '#000000',
        },
      },
    },
  },
});




Highcharts.addEvent(Highcharts.Point, 'click', function () {
    if (this.series.options.className.indexOf('popup-on-click') !== -1) {
        const chart = this.series.chart;
        const date = Highcharts.dateFormat('%A, %b %e, %Y', this.x);
        const text = `<b>${date}</b><br/>${this.y} ${this.series.name}`;

        const anchorX = this.plotX + this.series.xAxis.pos;
        const anchorY = this.plotY + this.series.yAxis.pos;
        const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
        const x = align === 'left' ? anchorX + 10 : anchorX - 10;
        const y = anchorY - 30;
        if (!chart.sticky) {
            chart.sticky = chart.renderer
                .label(text, x, y, 'callout',  anchorX, anchorY)
                .attr({
                    align,
                    fill: 'rgba(0, 0, 0, 0.75)',
                    padding: 10,
                    zIndex: 7 // Above series, below tooltip
                })
                .css({
                    color: 'white'
                })
                .on('click', function () {
                    chart.sticky = chart.sticky.destroy();
                })
                .add();
        } else {
            chart.sticky
                .attr({ align, text })
                .animate({ anchorX, anchorY, x, y }, { duration: 250 });
        }
    }
});
useEffect(() => {
    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Developer Performance Dashboard'
        },
        subtitle: {
            text: "Track performance of each individual developer."
        },
        xAxis: {
            type: 'datetime',

        },
        yAxis: {
            title: {
                text: 'TEXT'
            }
        },
        series: [{
            name: 'TEXT',
            data: rows
        }]
    });
}, []);


    return (
        <div>
             <Navbar/>
            <AnalyticDashboardsSidebar selectedDashboard={"Chatbot/TotalCostDashboard"}/>
            <div className="dashboard-wrapper">
                <div  id="container" ></div>
            </div>
             <Accordion defaultActiveKey="0" className="my-3">
    <Accordion.Item eventKey="0">
        <Accordion.Header>AI Reviews</Accordion.Header>
        <Accordion.Body>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {aiReviews.map(review => (
                    <div key={review.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                        <p><strong>Date:</strong> {review.date}</p>
                        <p><strong>Comment:</strong> {review.comment}</p>
                        <p><strong>Score:</strong> {review.score}/10</p>
                    </div>
                ))}
            </div>
        </Accordion.Body>
    </Accordion.Item>
</Accordion>

            <ThemeProvider theme={theme}>
    <div style={{
        height: '50vh',
        width: '60%',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5vh'
    }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
        />
    </div>
</ThemeProvider>


        </div>
    );
};

export default DeveloperPerformanceDashboard;
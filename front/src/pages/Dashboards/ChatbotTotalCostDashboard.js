import React, {useEffect} from "react";
//import NavBar from "./NavBar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";
import "./ChatbotTotalCostDashboard.css"
import Highcharts from 'highcharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from 'react-bootstrap/Accordion';



export const ChatbotTotalCostDashboard = () => {
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#C307F9', // A green shade as the primary action color
    },
    background: {
      default: '#2B0AFF', // Dark background for the overall layout
      paper: '#2B0AFF', // Slightly lighter for components background like DataGrid
    },
    text: {
      primary: '#C307F9',
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
    fontSize: 14, // Adjust base font size to match the dashboard's design
  },
  components: {
    // Customizing DataGrid look to fit into the dark theme
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none', // Remove default border
        },
        columnHeader: {
          backgroundColor: '#2B0AFF', // Column headers background
          color: '#ffffff', // Column headers text color to match primary color
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
            text: 'CODED AI Daily Cost Overview'
        },
        subtitle: {
            text: "GPT models' cost are calculated based on token generated."
        },
        xAxis: {
            type: 'datetime',

        },
        yAxis: {
            title: {
                text: 'Cost in USD'
            }
        },
        series: [{
            name: 'Daily Cost',
            data: rows
        }]
    });
}, []);


    return (
        <div>
            {/* <NavBar activeSection="Dashboards"/> */}
            <AnalyticDashboardsSidebar selectedDashboard={"Chatbot/TotalCostDashboard"}/>
            <div className="dashboard-wrapper">
                <div  id="container" ></div>
            </div>
             <Accordion defaultActiveKey="0" className="my-3">
  <Accordion.Item eventKey="0">
      <Accordion.Header>Generate Comments with AI<div className="dashboard-loader"></div></Accordion.Header>
      <Accordion.Body>
      Here you can generate AI-based comments for your data analysis. Use the controls below to customize the generation process:
      <div className="py-2">
        {/* Example controls or description here */}
        <p>Select the data points you wish to analyze or enter specific queries for the AI.</p>
        {/* Assuming you might add a form or controls here */}
      </div>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
            <ThemeProvider theme={theme}>
                <div style={{ height: '50vh', marginLeft:'50vh',  width: '60%', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
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

export default ChatbotTotalCostDashboard;

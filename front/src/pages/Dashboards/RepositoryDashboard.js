import React, {useEffect} from "react";
import Navbar from "./Navbar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";
import "./RepositoryDashboard.css"
import Highcharts from 'highcharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import { fetchPRCountLastQuarter, fetchmergedPrCntLastQuarter, fetchopenPrCntLastQuarter, fetchgetrepodashboard, fetchAllPRCount, fetchgetAllDevelopers, fetchgetcalculateDeveloperProductivity } from "../../api/connector";



export const RepositoryDashboard= () => {
const columns: GridColDef[] = [
    { field: 'id', headerName: 'Name', width: 70 },
  { field: 'x', headerName: 'PR Cnt', width: 130, type: 'Date' },
  { field: 'y', headerName: 'Productivity', width: 130, type: 'number' },
];

const rows = [
    { id: 1, x: new Date('2023-01-01'), y: 1200 },
    { id: 2, x: new Date('2023-01-02'), y: 1500 },
    { id: 3, x: new Date('2023-01-03'), y: 1800 },
    { id: 4, x: new Date('2023-01-04'), y: 1600 },
];


const [aiReviews, setAiReviews] = useState([]);
const [prCnt, setPRCnt] = useState(0);
const [mergedCnt, setMergedCnt] = useState(0);
const [openCnt, setOpenCnt] = useState(0);
//const [date, setDate] = useState([]);
const [owner, setOwner] = useState(null);
const [repo, setRepo] = useState(null);
const [authToken, setAuthToken] = useState(null);
const [openaiApiKey, setOpenAiAPIKey] = useState(null);
const [prNumber, setprNumber] = useState(null);

 

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





useEffect(() => {
    setAiReviews([
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
    ]);
    
    
    
    const fetchPRLastQ = async () => {
        console.log("the owner ", owner);  
        console.log("the token ", authToken); 
    
        console.log("the repo ", repo);  

        

        try {
            const response = await fetchAllPRCount("EvanLi", "Github-Ranking", "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" );
            console.log("fetchPRLastQ:", response);
            setPRCnt(response.title);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    
    
    
    const fetchMergedLastQ = async () => {
        try {
            const response = await fetchmergedPrCntLastQuarter("EvanLi", "Github-Ranking", "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");
            console.log("fetchMergedLastQ:", response);
            setMergedCnt(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
        
    const fetchOpenLastQ = async () => {
        try {
            const response = await fetchopenPrCntLastQuarter("EvanLi", "Github-Ranking", "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");
            console.log("fetchOpenLastQ:", response);
            setOpenCnt(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchRepoDashboard = async () => {
        try {
            const response = await fetchgetrepodashboard("EvanLi", "Github-Ranking", 3, "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");
            console.log("fetchRepoDashboard:", response);
            
            //setAiReviews(response);
        } catch (error) {
            console.error('Error:', error);
        }
    }; 
    
    
    const fetchAllDevelopers = async () => {
        try {
            const response = await fetchgetAllDevelopers("EvanLi", "Github-Ranking", "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");
            console.log("fetchAllDevelopers:", response);
            
            //setAiReviews(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };  
    
      
    
    
        
    const fetchcalculateDeveloperProductivity = async () => {
        try {
            const response = await fetchgetcalculateDeveloperProductivity("EvanLi", "Github-Ranking", "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", "sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn");
            console.log("fetchAllDevelopers:", response);
            
            //setAiReviews(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };  
    
    
    
    
    setOwner("EvanLi");
    setAuthToken("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");
    setRepo("Github-Ranking");
         

    fetchPRLastQ();
    fetchMergedLastQ(); //bu metod back te hata veriyor tekrar kontrol
   
    fetchOpenLastQ(); //error in this backend method
    //fetchRepoDashboard();
    
    fetchAllDevelopers();
    fetchcalculateDeveloperProductivity();
}, []);
  
        

 

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
                
                
    <Accordion.Item eventKey="0">
        <Accordion.Header>AI Reviews</Accordion.Header>
        
        <Accordion.Body>

<div>
        <p><strong>Total PR Count (Last Quarter): prCnt</strong></p>
        <p><strong>Merged (Last Quarter): mergedCnt</strong></p>
        <p><strong>Open (Last Quarter): openCnt</strong></p>
        </div>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {aiReviews.map(review => (
                    <div key={review.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                        <p><strong>Date:</strong> {review.date}</p>
                        <p><strong>Comment:</strong> {review.comment}</p>
                        <p><strong>Score:</strong> {review.score}/10</p>
                        <p><strong>Summarized:</strong> {review.highlights}</p>
                    </div>
                ))}
            </div>
        </Accordion.Body>
    </Accordion.Item>
</Accordion>

           


        </div>
    );
};

export default RepositoryDashboard;

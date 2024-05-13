import React, {useEffect} from "react";
import Navbar from "./Navbar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";
import "./RepositoryDashboard.css"
import Highcharts from 'highcharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import { fetchPRCountLastQuarter, fetchmergedPrCntLastQuarter, fetchopenPrCntLastQuarter, fetchgetrepodashboard, fetchAllPRCount, fetchgetAllDevelopers, fetchgetcalculateDeveloperProductivity, fetchgetAllPullRequests } from "../../api/connector";
import MenuItem from "antd/lib/menu/MenuItem";
import {Select} from "antd";



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




const handleChange = (event) => {
    setSelectedDeveloper(event.target.value);
};

const rowsPR = [
    { id: 1, x: 'John', y: 1200, z: 'Done'},
    { id: 2, x: 'Joe', y: 300, z: 'Pending'},
    { id: 3, x: 'Linda', y: 200, z: 'Cancelled'},
    { id: 4, x: 'Ryan', y: 1400, z: 'Done'},
];



const [aiReviews, setAiReviews] = useState([]);
const [prCnt, setPRCnt] = useState(0);
const [mergedCnt, setMergedCnt] = useState(0);
const [openCnt, setOpenCnt] = useState(0);
//const [date, setDate] = useState([]);
// const [owner, setOwner] = useState(null);
// const [repo, setRepo] = useState(null);
// const [authToken, setAuthToken] = useState(null);

const [openaiApiKey, setOpenAiAPIKey] = useState(null);
const [prNumber, setprNumber] = useState(null);
const [selectedDeveloper, setSelectedDeveloper] = useState('');

const [owner, setOwner] = useState("defaultOwner");
const [repo, setRepo] = useState("defaultRepo");
const [authToken, setAuthToken] = useState("defaultToken");
const [pr, setSelectedpr] = useState("");


 

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
            setMergedCnt(response.teams);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
        
    const fetchOpenLastQ = async () => {
        try {
            const response = await fetchopenPrCntLastQuarter("EvanLi", "Github-Ranking", "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");
            console.log("fetchOpenLastQ:", response);
            setOpenCnt(response.teams);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchRepoDashboard = async () => {
        try {
            const response = await fetchgetrepodashboard("EvanLi", "Github-Ranking", 31, "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");
            console.log("fetchRepoDashboard3333:", response);
            
            setAiReviews(response.teams);
        } catch (error) {
            console.error('Error repoDashboard:', error);
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
            console.log("fetchcalculateDeveloperProductivity22222:", response);
            
            //setAiReviews(response);
        } catch (error) {
            console.error('Error22222:', error);
        }
    };  
    
            
    const fetchgetAllPullRequestss = async () => {
        try {
            //console.log("inside fetchgetAllPullRequests");
            const response = await fetchgetAllPullRequests("EvanLi", "Github-Ranking", "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");
            console.log("fetchgetAllPullRequests:", response);
            
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
    fetchRepoDashboard();
    
    fetchAllDevelopers();
    fetchcalculateDeveloperProductivity();
    fetchgetAllPullRequestss();
}, []);
 


    return (
        <div>
            <Navbar/>
            <AnalyticDashboardsSidebar selectedDashboard={"Chatbot/TotalCostDashboard"}/>
           
             <Accordion defaultActiveKey="0" className="my-3">
             <Select
                    value={pr}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                    style={{width: 200, marginBottom: 20, marginTop: 20, marginLeft: 20}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {rows.map((row) => (
                        <MenuItem key={row.id} value={row.x}>{row.x}</MenuItem>
                    ))}
                </Select>
                
             <Select
                    value={selectedDeveloper}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                    style={{width: 200, marginBottom: 20}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {rowsPR.map((row) => (
                        <MenuItem key={rowsPR.id} value={rowsPR.x}>{rowsPR.x}</MenuItem>
                    ))}
                </Select>
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
        
        <Accordion.Body className="reviewBody">

<div>
        <p><strong>Total PR Count (Last Quarter): {prCnt}</strong></p>
        <p><strong>Merged (Last Quarter): {mergedCnt}</strong></p>
        <p><strong>Open (Last Quarter): {openCnt}</strong></p>
        </div>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {aiReviews.map(review => (
                    <div key={review.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                        <p><strong>Date:</strong> {review.date}</p>
                        <p><strong>Comment:</strong> {review.comment}</p>
                        <p><strong>Score:</strong> {review.score}/10</p>
                        <p><strong>Summarized:</strong> {review.summary}</p>
                        <p><strong>Tone of comment:</strong> {review.tone}</p>
                        <p><strong>Content of comment and PR match:</strong> {review.prMatch}</p>

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

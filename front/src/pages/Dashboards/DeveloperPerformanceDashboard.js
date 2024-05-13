import React, {useState} from "react";
import Navbar from "./Navbar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";
import "./DeveloperPerformanceDashboard.css"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from 'react-bootstrap/Accordion';
import {Select} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import StatBox from "./Statbox";



export const DeveloperPerformanceDashboard = () => {
const columns: GridColDef[] = [
    { field: 'ID', headerName: 'ID', width: 70 },
  { field: 'x', headerName: 'Developer', width: 130, type: 'String' },
  { field: 'y', headerName: 'PR Count', width: 130, type: 'number' },
    { field: 'z', headerName: 'PR Status', width: 130, type: 'String' },
    { field: 'a', headerName: 'Comment Cnt', width: 130, type: 'String' },

];

const rows = [
    { id: 1, x: 'John', y: 1200, z: 'Done'},
    { id: 2, x: 'Joe', y: 300, z: 'Pending'},
    { id: 3, x: 'Linda', y: 200, z: 'Cancelled'},
    { id: 4, x: 'Ryan', y: 1400, z: 'Done'},
];

const [selectedDeveloper, setSelectedDeveloper] = useState('');
    const [totalPRCount, setTotalPRCount] = useState()
    const [productivity, setProductivity] = useState()
    const [totalLOC, setTotalLOC] = useState()
    const [nofReviewedCommits, setNofReviewedCommits] = useState()
    const [PartipicationPR, setPartipicationPR] = useState()
    const [noOfPRComments, setNoOfPRComments] = useState()

    const handleChange = (event) => {
        setSelectedDeveloper(event.target.value);
    };


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

    return (
        <div>
             <Navbar/>
            <AnalyticDashboardsSidebar selectedDashboard={"DeveloperPerformanceDashboard"}/>
            <div className="dashboard-wrapper">
                <div  id="container" ></div>
            </div>
            <Accordion defaultActiveKey="0" className="my-3">
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
                    {rows.map((row) => (
                        <MenuItem key={row.id} value={row.x}>{row.x}</MenuItem>
                    ))}
                </Select>
                <div className="dashboard-stats">
                    <StatBox title="Total PR Created" number={totalPRCount}/>
                    <StatBox title="Productivity" number={productivity}/>
                    <StatBox title="Frequency in Participation of PR comments" number={PartipicationPR}/>
                </div>
                <div className="dashboard-stats">
                    <StatBox title="Number of Reviewed Commits" number={nofReviewedCommits}/>
                     <StatBox title="Number of Comments under PRs" number={noOfPRComments}/>
                </div>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>AI Reviews</Accordion.Header>
                    <Accordion.Body>
                        <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                            {aiReviews.map(review => (
                                <div key={review.id}
                                     style={{marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc'}}>
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

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";
import "./DeveloperPerformanceDashboard.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Accordion from "react-bootstrap/Accordion";
import { Select } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import StatBox from "./Statbox";
import {
  fetchPRCountLastQuarter,
  fetchmergedPrCntLastQuarter,
  fetchopenPrCntLastQuarter,
  fetchgetrepodashboard,
  fetchLatestPRCommentsByDeveloper,
  fetchAllPRCount,
  fetchgetAllDevelopers,
  fetchgetcalculateDeveloperProductivity,
  fetchgetAllPullRequests,
  fetchPRCountByDeveloper,
  fetchgetReviewedCommitsCount,
  fetchPRCommentFrequency,
  fetchTotalPRCommentsByDeveloper,
  getDeveloperPRActivities,
  fetchLatestPRComments,
  fetchcalculateDeveloperProductivity,
} from "../../api/connector";

export const DeveloperPerformanceDashboard = () => {
  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 70 },
    { field: "x", headerName: "Developer", width: 130, type: "String" },
    { field: "y", headerName: "PR Count", width: 130, type: "number" },
    { field: "z", headerName: "PR Status", width: 130, type: "String" },
    { field: "a", headerName: "Comment Cnt", width: 130, type: "String" },
  ];

  const rows = [
    { id: 1, x: "John", y: 1200, z: "Done", a: 4 },
    { id: 2, x: "Joe", y: 300, z: "Pending" },
    { id: 3, x: "Linda", y: 200, z: "Cancelled" },
    { id: 4, x: "Ryan", y: 1400, z: "Done" },
  ];

  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [totalPRCount, setTotalPRCount] = useState();
  const [productivity, setProductivity] = useState();
  const [totalLOC, setTotalLOC] = useState();
  const [nofReviewedCommits, setNofReviewedCommits] = useState();
  const [partipicationPR, setPartipicationPR] = useState();
  const [noOfPRComments, setNoOfPRComments] = useState();
  const [developerActivity, setDeveloperActivity] = useState();

  const handleChange = (event) => {
    console.log("handleChange triggered");

    setSelectedDeveloper(event.x);
    fetchPRCountByTheDeveloper();
    fetchReviewedCommitsCount();
    //fetchfetchPRCommentFrequency();
    //getTotalPRCommentsByDeveloper();
    fetchDeveloperPRActivities();
    getLatestPRComments();
    fetchgetProductivity();
    fetchgetLatestPrInfo();
  };
  const [owner, setOwner] = useState(null);
  const [repo, setRepo] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [devList, setDevList] = useState([]);
  const [theRows, setRows] = useState([]);
  const [aiReviews, setAiReviews] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2A2C38",
      },
      background: {
        default: "#2A2C38",
        paper: "#f0f0f0",
      },
      text: {
        primary: "#2A2C38",
        secondary: "3",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontSize: 14,
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "none",
          },
          columnHeader: {
            backgroundColor: "#2A2C38",
            color: "#ffffff",
          },
          row: {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        },
      },
    },
  });

  const fetchPRCountByTheDeveloper = async () => {
    try {
      //console.log("inside fetchgetAllPullRequests");
      const response = await fetchPRCountByDeveloper(
        "EvanLi",
        "Github-Ranking",
        "EvanLi",
        "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"
      );
      console.log("fetchPRCountByTheDeveloper:", response.teams);
      setTotalPRCount(response.teams);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchReviewedCommitsCount = async () => {
    try {
      //console.log("inside fetchgetAllPullRequests");
      const response = await fetchgetReviewedCommitsCount(
        "EvanLi",
        "Github-Ranking",
        "EvanLi",
        "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"
      );
      console.log("fetchReviewedCommitsCount:", response.teams);
      setNofReviewedCommits(response.teams);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchfetchPRCommentFrequency = async () => {
    try {
      //console.log("inside fetchgetAllPullRequests");
      const response = await fetchPRCommentFrequency(
        "EvanLi",
        "Github-Ranking",
        "EvanLi",
        "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"
      );
      console.log("fetchfetchPRCommentFrequency:", response.teams);
      setPartipicationPR(response.teams.participationFrequency);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTotalPRCommentsByDeveloper = async () => {
    try {
      //console.log("inside fetchgetAllPullRequests");
      const response = await fetchTotalPRCommentsByDeveloper(
        "EvanLi",
        "Github-Ranking",
        "EvanLi",
        "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"
      );
      console.log("getTotalPRCommentsByDeveloper:", response.teams);
      setNoOfPRComments(response.teams);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDeveloperPRActivities = async () => {
    try {
      // Fetch data from the backend
      const response = await getDeveloperPRActivities(
        "EvanLi",
        "Github-Ranking",
        "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"
      );
      console.log("fetchDeveloperPRActivities:", response);

      // Map the response to the rows format
      const updatedRows = response.teams.map((developer, index) => ({
        id: index + 1, // Assign an ID based on the array index for uniqueness
        x: developer.username, // Map 'username' to 'x'
        y: developer.pullRequestCount, // Map 'pullRequestCount' to 'y'
        z: developer.latestPRStatus, // Map 'latestPRStatus' to 'z'
        a: developer.commentsOnLatestPR, // Map 'commentsOnLatestPR' to 'a'
      }));
      console.log("the updated rows", updatedRows);

      setDeveloperActivity(response); // Update state with the full response
      setRows(updatedRows); // Update the rows state with the new formatted data
    } catch (error) {
      console.error(
        "Error fetching and processing developer activities:",
        error
      );
    }
  };

  const getLatestPRComments = async () => {
    try {
      // Fetch data from the backend
      const response = await fetchLatestPRComments(
        "EvanLi",
        "Github-Ranking",
        "EvanLi",
        "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"
      );
      console.log("getLatestPRComments:", response);
    } catch (error) {
      console.error(
        "Error fetching and processing developer activities:",
        error
      );
    }
  };

  const fetchgetProductivity = async () => {
    try {
      //owner, repo, developer, githubToken, openaiApiKey
      const response = await fetchcalculateDeveloperProductivity(
        "EvanLi",
        "Github-Ranking",
        "Evanli",
        "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",
        "sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn"
      );
      console.log("fetchgetProductivity:", response);
      setProductivity(response.teams);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchgetLatestPrInfo = async () => {
    try {
      console.log("inside fetchgetLatestPrInfo:");

      //console.log("inside fetchgetAllPullRequests");
      const response = await fetchLatestPRCommentsByDeveloper(
        "EvanLi",
        "Github-Ranking",
        "EvanLi",
        "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"
      );
      console.log("fetchLatestPRCommentsByDeveloper:", response);
      setAiReviews(response.teams);

      /*
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


    ];*/
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchAllDevelopers = async () => {
      try {
        const developers = await fetchgetAllDevelopers(
          "EvanLi",
          "Github-Ranking",
          "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"
        );
        console.log("fetchAllDevelopers:", developers);
        console.log(developers.teams[0].login);
        // Generate rows array dynamically
        if (developers.teams && developers.teams.length > 0) {
          const rows = developers.teams.map((team, index) => ({
            id: index + 1,
            x: team.login, // Assuming the username is stored under the 'login' key
            y: Math.floor(Math.random() * 1000), // Example usage of random y values
            z: ["Done", "Pending", "Cancelled"][Math.floor(Math.random() * 3)], // Randomly assign a status for demonstration
          }));

          console.log("Rows:", rows);
          setDevList(rows);
        } else {
          console.log("No teams found or teams array is empty.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchgetAllPullRequestss = async () => {
      try {
        //console.log("inside fetchgetAllPullRequests");
        const response = await fetchgetAllPullRequests(
          "EvanLi",
          "Github-Ranking",
          "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"
        );
        console.log("fetchgetAllPullRequests:", response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    setOwner("EvanLi");
    setAuthToken("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");

    setRepo("Github-Ranking");

    fetchAllDevelopers();
    //fetchcalculateDeveloperProductivity();
  }, []);

  return (
    <div>
      <Navbar />
      <AnalyticDashboardsSidebar
        selectedDashboard={"DeveloperPerformanceDashboard"}
      />
      <div className="dashboard-wrapper">
        <div id="container"></div>
      </div>
      <Accordion defaultActiveKey="0" className="my-3">
        <Select
          value={selectedDeveloper}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          style={{ width: 200, marginBottom: 20 }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {devList.map((row) => (
            <MenuItem key={row.id} value={row.x}>
              {row.x}
            </MenuItem>
          ))}
        </Select>
        <div className="dashboard-stats">
          <StatBox title="Total PR Created" number={totalPRCount} />
          <StatBox title="Productivity" number={productivity} />
          <StatBox
            title="Frequency in Participation of PR comments"
            number={partipicationPR}
          />
        </div>
        <div className="dashboard-stats">
          <StatBox
            title="Number of Reviewed Commits"
            number={nofReviewedCommits}
          />
          <StatBox
            title="Number of Comments under PRs"
            number={noOfPRComments}
          />
        </div>
        <Accordion.Item eventKey="0">
          <Accordion.Header>AI Reviews : Latest PR</Accordion.Header>
          <Accordion.Body>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {aiReviews.length > 0 ? (
                aiReviews.map((review) => (
                  <div
                    key={review.id}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <p>
                      <strong>Date:</strong> {review.date}
                    </p>
                    <p>
                      <strong>Comment:</strong> {review.comment}
                    </p>
                    <p>
                      <strong>Score:</strong> {review.score}/10
                    </p>
                  </div>
                ))
              ) : (
<Accordion.Body>No Comments</Accordion.Body>              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ThemeProvider theme={theme}>
        <div
          style={{
            height: "50vh",
            width: "60%",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5vh",
          }}
        >
          <DataGrid
            rows={theRows}
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

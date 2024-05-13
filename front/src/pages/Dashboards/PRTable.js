import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './PRTable.css';
import {
    fetchPRReviewCounts,
    fetchPRReviewCommentsCounts
} from "../../api/connector";
import {useEffect, useState} from "react";





const PRTable = () => {


    const [rows, setRows] = useState([]);
    const [owner, setOwner] = useState(null);
    const [repo, setRepo] = useState(null);

    useEffect(() => {
        setOwner("EvanLi");
        setRepo("Github-Ranking");

        const fetchData = async () => {
            try {
                // Fetch PR review counts per developer
                const prReviewCountsResponse = await fetchPRReviewCounts(owner, repo); // Replace owner and repo with actual values
                const prReviewCounts = prReviewCountsResponse.review;

                // Fetch PR review comments counts per developer
                const prReviewCommentsCountsResponse = await fetchPRReviewCommentsCounts(owner, repo); // Replace owner and repo with actual values
                const prReviewCommentsCounts = prReviewCommentsCountsResponse.ranked;

                // Merge the data to get the final rows
                const mergedData = mergeData(prReviewCounts, prReviewCommentsCounts);

                // Update the rows state
                setRows(mergedData);
            } catch (error) {
                console.error('Error fetching PR review counts:', error);
            }
        };

        fetchData();
    }, []);

    const mergeData = (prReviewCounts, prReviewCommentsCounts) => {
        // Merge the data based on developer names
        const mergedData = prReviewCounts.map(prReviewCount => {
            const matchingCommentCount = prReviewCommentsCounts.find(prReviewCommentCount => prReviewCommentCount.developer === prReviewCount.developer);
            return {
                id: prReviewCount.id,
                name: prReviewCount.developer,
                prCount: matchingCommentCount ? matchingCommentCount.comments : 0,
            };
        });

        return mergedData;
    };


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Developer', width: 150 },
        { field: 'prCount', headerName: 'PR Count', type: 'number', width: 110 },
    ];

    return (
        <div style={{ height: 400, width: '100%', marginTop: '30px'}} className="data-grid-container">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default PRTable;

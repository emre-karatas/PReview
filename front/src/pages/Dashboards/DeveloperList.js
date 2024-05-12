import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'name', headerName: 'Developer', width: 150 },
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'prCount', headerName: 'PR Count', type: 'number', width: 90 },
    { field: 'status', headerName: 'PR Status', width: 120 },
];

const DeveloperList = ({ developers }) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={developers}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
};

export default DeveloperList;

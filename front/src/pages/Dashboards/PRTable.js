import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './PRTable.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Developer', width: 150 },
  { field: 'prCount', headerName: 'PR Count', type: 'number', width: 110 },
];

const rows = [
  { id: 1, name: 'John Doe', prCount: 35 },
  { id: 2, name: 'Jane Doe', prCount: 42 },
];

const PRTable = () => {
  return (
    <div style={{ height: 400, width: '100%' }} className="data-grid-container">
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

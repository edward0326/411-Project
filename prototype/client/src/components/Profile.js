import * as React from 'react';
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', type: "string", width: 130 },
  {
    field: 'gender',
    headerName: 'Gender',
    type: 'string',
    width: 90,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: "string",
    width: 160,
  },
  {
    field: "createdOn",
    headerName: "Became a member since",
    type: "date",
    width: 200
  }
];

const updatedData = (data) => {
  return data.map(({_id: id, ...rest}) => ({
    id,
    ...rest
  }));
};

export const Profile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/users");
        const data = await response.json();
        setUsers(updatedData(data));
      } catch (error) {
        console.log("Failed to retrieve users data: ", error);
      }
    };
  
    fetchData();
  }, []);

  console.log("DEBUG USERS: ", users);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

import { Alert, Box, Button, LinearProgress, Link, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataInvoices } from "../../../data/mockData";
import Header from "../../../components/Header";
import { SubmitProjects } from "../../../data/UserData";
import { Download, RemoveRedEye, Verified } from "@mui/icons-material";
import { VerifiedProject } from "../../../functions/admin/function";
import { useState } from "react";

const SubmitedProjects = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [message, setMessage] = useState();
  const [loading, setloading] = useState(false);

  const ColoumsData = SubmitProjects.at(0).map((item, index) => ({
    id: index + 1,
    ProjectName: item.data.ProjectName,
    Description: item.data.Description,
    url: item.data.url,
    Attachment: item.data.Attachment,
    verified: item.data.verified,
    key: item.key,
    Acceptor: item.data.Accpetor
  }))

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "ProjectName",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Acceptor",
      headerName: "Acceptor",
      flex: 1,
    },
    {
      field: "Description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "url",
      headerName: "Url",
      renderCell: (params) => (
        <>
        { (params.row.url) ? (<Link href={params.row.url} color={colors.greenAccent[700]}>
          <RemoveRedEye />
        </Link>) : (<Typography> NaN </Typography>)}
        </>
      ),
    },
    {
      field: "Attachment",
      headerName: "Attachment",
      renderCell: (params) => (
        <>
          {(params.row.Attachment) ? (<Link href={params.row.Attachment} color={colors.blueAccent[300]} dowloaded={params.row.ProjectName}>
            <Download />
          </Link>) : (<Typography> NaN </Typography>)}
        </>
      ),
    },
    {
      field: "verified",
      headerName: "Verified",
      renderCell: (params) => (
        <Button color={params.row.verified ? 'success' : 'info'} onClick={() => VerifiedProject(params.row.key, setMessage, params.row.verified, setloading)} >
          <Verified />
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Submited Project" subtitle="Verified the Porjects" />
      {message ? (<Alert severity={message === "Project Verified" ? "success" : "warning"}> {message} </Alert>) : null}
      {loading ? (<LinearProgress />) : null}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={ColoumsData} columns={columns} />
      </Box>
    </Box>
  );
};

export default SubmitedProjects;

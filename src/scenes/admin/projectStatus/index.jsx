import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { NewPorjects } from "../../../data/UserData";
import { useEffect } from "react";
import { getProjects } from "../../../functions/admin/function";
import { Download, Edit, RemoveRedEyeRounded } from "@mui/icons-material";
import UpdataProject from "./UpdataProject";
import dayjs from "dayjs";

const ProjectStatus = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(NewPorjects.at(0));
  const ColumsData = NewPorjects.at(0).map((item, index) => (
    {
      id: index + 1,
      ProjectName: item.data.ProjectName,
      Department: item.data.Department,
      Description: item.data.Description,
      Deadline: item.data.Deadline,
      Attachment: item.data.Attachment,
      ResourcesLink: item.data.ResourcesLink,
      Status: item.data.Status,
      key: item.key,
      InternUid: item.data.Internuid
    }
  ));
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "ProjectName",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Department",
      headerName: "Department",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "Deadline",
      headerName: "Deadline",
      flex: 1,
      renderCell: ({row: { Deadline }}) => (
        <Typography> {dayjs(Deadline).format('DD-MM-YYYY (hh:MM A)')} </Typography>
      )
    },
    // {
    //   field: "Status",
    //   headerName: "Status",
    //   flex: 1,
    // },
    {
      field: "Description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "ResourcesLink",
      headerName: "Resources",
      flex: 1,
      renderCell: ({row: { ResourcesLink, Attachment }}) => (
        <Typography >
          {ResourcesLink != "" || Attachment != ""  ? 'Resources Available' : 'NaN' }
        </Typography>
      )
    },
    {
      field: "Status",
      headerName: "View",
      flex: 1,
      renderCell: (parma) => (
        <Box>
          {/* <Button >
            {Status === 0  ? (<Edit color='info' />) : (<RemoveRedEyeRounded color='secondary' />) }
          </Button> */}
          <UpdataProject data={parma.row} />
        </Box>
      )
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Project Status"
        subtitle="Look the Projects Status"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={ColumsData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ProjectStatus;

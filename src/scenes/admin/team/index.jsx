import { Alert, Box, Button, Dialog, DialogTitle, Link, MenuItem, Modal, Select, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import AddIntern from "./addIntern";
import { useEffect, useState } from "react";
import { Intern } from "../../../data/UserData";
import { UserEdit } from "./userEdit";
import { Password } from "@mui/icons-material";

const InternScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [AlertMessage, setAlertMessage] = useState('');
  const Row = [];
  
  console.log(Intern);
    Intern.at(0).map((item, index) => {
      Row.push({
        id: index + 1,
        username: item.data.username,
        email: item.data.email,
        Password: item.data.password,
        accountstatus: item.data.accountStatus,
        department: item.data.department,
        designation: item.data.desination,
        isAdmin: item.data.IsAdmin,
        key: item.key,
        companyName: item.data.CompanyName
      })
    })

  const columns = [
      { field: "id", headerName: "ID" },
      {
        field: "username",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "designation",
        headerName: "Designation",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "department",
        headerName: "Department",
        headerAlign: "left",
        align: "left",
        flex: 1,
      },
      {
        field: "accountstatus",
        headerName: "Access Level",
        flex: 1,
        renderCell: (parma) => {
          return (
            <UserEdit data={parma.row} Alert={setAlertMessage} />
          );
        },
      },
      // {
      //   field: "key",
      //   headerName: "Key",
      //   flex: 1/2,
      //   align: "center",
      //   renderCell: ({ row: { key } }) => {
      //     return (
      //       <Button onClick={() => EditInternAccount(key)} variant="outlined" color="secondary" >
      //         <Edit/>
      //       </Button>
      //     );
      //   },
      // },
    ];

  return (
    <Box m="20px">
      { AlertMessage ? (<Alert severity="warning"> {AlertMessage} </Alert>) : null }
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Header title="TEAM" subtitle="Managing the Team Members" />
        <Box>
          <Button variant="outlined" color="secondary" onClick={() => {setOpen(true)}} >Add Intern</Button>
        </Box>
      </Box>
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
        <DataGrid rows={Row} columns={columns} />
      </Box>

      { open ? 
      ( <AddIntern open={open} setOpen={setOpen} /> ) : null }
    </Box>
  );
};

export default InternScreen;

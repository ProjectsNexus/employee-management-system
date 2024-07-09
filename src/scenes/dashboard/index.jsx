import { Box, Button, useTheme, useThemeProps } from "@mui/material";
import { tokens } from "../../theme";
import AdminDashboard from "./adminDashboard";
import InternDashboard from "./internDashboard";
import { UserProfile } from "../../data/UserData";
import Header from "../../components/Header";
import { useContext } from "react";
import user from "../../functions/context/userState";


const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
  const isadmin = UserProfile.at(0).IsAdmin;
  const [CurrentUser , SetCurrentUser, isloading, setisloading, Error, setError] = useContext(user)

  return (
    <Box m="20px">
    {/* HEADER */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Box>
        {/* <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Reports
        </Button> */}
      </Box>
    </Box>

    {/* GRID & CHARTS */}

    {isadmin ? (<AdminDashboard />) : (<InternDashboard />)}
  </Box>
  );
};

export default Dashboard;

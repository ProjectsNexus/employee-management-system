import { Alert, Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { signOut } from "firebase/auth";
import { auth } from "../../functions/firebase/config";
import { Logout } from "@mui/icons-material";
import user from "../../functions/context/userState";
import Notification from "../topbar/notification";
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const md = theme.breakpoints.up('md')
  const colorMode = useContext(ColorModeContext);
  const [CurrentUser , SetCurrentUser, isloading, setisloading, Error, setError] = useContext(user)
  
  const logOut = () => {
    signOut(auth);
  }
  return (
    <Box p={2} display={"flex"} justifyContent={'space-between'}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {Error ? (
          <Alert severity='error' onClose={() => {setError('')}} sx={{fontSize: !md ? 22 : 11}}> {Error} </Alert>
        ) : null}
      </Box>
      
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex" justifyContent={"flex-end"}>
        
        <Link>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Link>
        <Notification />
        { /*<IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <Link to={'/profile'}>
          <IconButton>
              <PersonOutlinedIcon />
          </IconButton> 
        </Link>
        <Link to={'/faq'} >
          <IconButton>
              <HelpOutlineOutlinedIcon />
          </IconButton>
        </Link>
        <Link>
          <IconButton onClick={logOut}>
            <Logout />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Topbar;

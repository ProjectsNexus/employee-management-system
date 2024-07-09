import { useContext, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import UploadIcon from '@mui/icons-material/Upload';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddBoxIcon from '@mui/icons-material/AddBox';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PublishIcon from '@mui/icons-material/Publish';
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import styled from "styled-components";
import user from "../../functions/context/userState";
import { Intern, UserProfile } from "../../data/UserData";
import { CheckIsAdmin } from "../../functions/admin/function";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const ismoblie = useMediaQuery('min-width: 600px')
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const isadmin = UserProfile.at(0).IsAdmin;

  useEffect(() => {
      if(!ismoblie) {
        setIsCollapsed(true);
      }
      return
  }, [ismoblie])
  return (
    <Conatiner>
      <Box
        className="sideBar"
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}>
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    Cre8ivCove
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box> */}
                <Box textAlign="center">
                  
                  {
                    (
                      <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "10px 0 0 0" }}>
                          {UserProfile.at(0).FirstName} {UserProfile.at(0).LastName}
                        </Typography>
                    )
                  }
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    Welcome
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

              {/* <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
                >
                Admin
                </Typography> */}
              {isadmin ?
                (
                  <>
                    <Item
                      title="Manage Team"
                      to="/intern"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                    title="Project Status"
                    to="/projects-status"
                    icon={<ContactsOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                    <Item
                      title="Submit Project"
                      to="/submited-project"
                      icon={<ReceiptOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Upload Project"
                      to="/upload-project"
                      icon={<UploadIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
              )

              /* Intern Pages */
                // <Typography
                //   variant="h6"
                //   color={colors.grey[300]}
                //   sx={{ m: "15px 0 5px 20px" }}
                // >
                //   Pages
                // </Typography>
                /* <Item
                  title="Profile"
                  to="/profile"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */
                /* <Item
                  title="Calendar"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */
                /* <Item
                  title="FAQ Page"
                  to="/faq"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */
                :
                (
                  <>
                    <Item
                      title="Projects"
                      to="/project"
                      icon={<AssignmentTurnedInIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Your projects"
                      to="/yourproject"
                      icon={<AddBoxIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Submit Project"
                      to="/submitproject"
                      icon={<PublishIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )
              }
              {/* <Item
                title="board / todos"
                to="/board"
                icon={<PlaylistAddCheckIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}

              {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
              {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </Conatiner>
  );
};

export default Sidebar;

const Conatiner = styled.div`
  height: 100vh;
`;

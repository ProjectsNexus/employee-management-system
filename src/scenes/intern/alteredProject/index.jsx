// export default AlteredProjects;
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WorkingProjects from './wokingProject';
import ReviewProjects from './reviewProject';
import CompletedProjects from './completedProject';
import { useTheme } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children} </Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AlteredProjects() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor='secondary' >
          <Tab label="Processing" {...a11yProps(0)} />
          <Tab label="Revewing" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <WorkingProjects />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ReviewProjects />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CompletedProjects />
      </CustomTabPanel>
    </Box>
  );
}


// import React from 'react';
// import { Box, Switch, Tabs } from '@mui/material';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

// import WorkingProjects from './wokingProject';
// import ReviewProjects from './reviewProject';
// import CompletedProjects from './completedProject';
// import Header from '../../../components/Header';

// function useTabNavigation() {
//   const paths = ['/project', '/yourproject/reviewed', '/yourproject/completed'];
//   return paths.indexOf(location.pathname);
// }

// export default function AlteredProjects() {
//   const value = useTabNavigation();

//   const handleChange = (event, newValue) => {
//     const paths = ['/project', '/yourproject/reviewed', '/yourproject/completed'];
//   };

//   return (
//     <Box m="20px">
//       <Box display="flex" justifyContent="space-between">
//         <Header title="Your Projects" subtitle="Look Project History" />
//       </Box>
//       <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" role="navigation">
//         <LinkTab label="In Working" href="/project" />
//         <LinkTab label="In Review" href="/yourproject/reviewed" />
//         <LinkTab label="Completed" href="/yourproject/completed" />
//       </Tabs>
//       <Switch>
//         <Route exact path="/project" component={WorkingProjects} />
//         <Route path="/yourproject/reviewed" component={ReviewProjects} />
//         <Route path="/yourproject/completed" component={CompletedProjects} />
//       </Switch>
//     </Box>
//   );
// }


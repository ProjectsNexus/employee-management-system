import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useContext } from "react";
import user from "../../functions/context/userState";

const Bar = () => {

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;

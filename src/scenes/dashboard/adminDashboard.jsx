import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { NewPorjects } from "../../data/UserData";
import { AccountTree, Checklist, PendingActions, Verified } from "@mui/icons-material";
import dayjs from "dayjs";

const AdminDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={isNonMobile ? 'span 3' : "span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={NewPorjects.at(0).length}
            subtitle="Total Projects"
            progress={NewPorjects.at(0).filter((e) => (e.data.Status === 1)).length / NewPorjects.at(0).length}
            increase={'+' + Math.round(NewPorjects.at(0).filter((e) => (e.data.Status === 0)).length / NewPorjects.at(0).length * 100) + '%'}
            icon={
              <AccountTree
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? 'span 3' : "span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={NewPorjects.at(0).filter((e) => (e.data.Status === 1)).length}
            subtitle='Pending Porjects'
            progress={NewPorjects.at(0).filter((e) => (e.data.Status === 1)).length / NewPorjects.at(0).length}
            increase={'+' + Math.round(NewPorjects.at(0).filter((e) => (e.data.Status === 1)).length / NewPorjects.at(0).length * 100) + '%'}
            icon={
              <PendingActions
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? 'span 3' : "span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={NewPorjects.at(0).filter((e) => (e.data.Status === 2)).length}
            subtitle='In Reviewing'
            progress={NewPorjects.at(0).filter((e) => (e.data.Status === 2)).length / NewPorjects.at(0).length }
            increase={'+' + Math.round(NewPorjects.at(0).filter((e) => (e.data.Status === 2)).length / NewPorjects.at(0).length * 100) + '%'}
            icon={
              <Checklist
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? 'span 3' : "span 6"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={NewPorjects.at(0).filter((e) => (e.data.Status === 3)).length}
            subtitle="Completed"
            progress={NewPorjects.at(0).filter((e) => (e.data.Status === 3)).length / NewPorjects.at(0).length }
            increase={'+' + Math.round(NewPorjects.at(0).filter((e) => (e.data.Status === 3)).length / NewPorjects.at(0).length * 100) + '%'}
            icon={
              <Verified
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn={isNonMobile ? "span 8" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // sx={{
          //   "& > div": { gridColumn: isNonMobile ? "span 8" : "span 12" },
          // }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Working Status
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {NewPorjects.at(0).length}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                {/* <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                /> */}
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Projects
            </Typography>
          </Box>
          {NewPorjects.at(0).filter((e) => (e.data.Status === 0)).slice(0, 3).map((transaction, i) => (
            <Box
              key={`${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.data.ProjectName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.data.Department}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {dayjs(transaction.data.Deadline).format('DD-MM-YYYY')}
                <Typography variant='body2'> {dayjs(transaction.data.Deadline).format('hh-MM A')} </Typography>
              </Box>
              {/* <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box> */}
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isNonMobile ? 'span 4' : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Projects
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="150"/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {NewPorjects.at(0).filter((e) => (e.data.Status === 2)).length + NewPorjects.at(0).filter((e) => (e.data.Status === 3)).length} Projects Out of {NewPorjects.at(0).filter((e) => (e.data.Status != 0)).length} has been completed
            </Typography>
            {/* <Typography>Includes extra misc expenditures and costs</Typography> */}
          </Box>
        </Box>
        <Box
          gridColumn={isNonMobile ? 'span 8' : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Interns
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
  );
};

export default AdminDashboard;

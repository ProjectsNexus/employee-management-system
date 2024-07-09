import { Box, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What be these features of these web app?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The features of our web app are designed for project management, attendance tracking, employee management and project verification.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Would it be easy for beginners to use your web app?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Definitely yes, our web app’s interface is designed with simplicity in mind thus making it user-friendly to everyone no matter their level of experience.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Please give me a rough idea of how fast the web application loads?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our web application has been made to load very fast so that it enhances effective and time saving operations during its usage as it ensures utmost use of time hence higher returns.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Is it possible to get all necessary functions in the same area?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            For sure! Our web application has been integrated with all required functions making project and staff management easier.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            The Final Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
};

export default FAQ;

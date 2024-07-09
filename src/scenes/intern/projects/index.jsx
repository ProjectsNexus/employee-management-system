import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, LinearProgress, Tooltip, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { getProjects, UpdateProjectStatus } from "../../../functions/intern/function";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { UserProfile } from "../../../data/UserData";
import { Link } from "react-router-dom";

const Projects = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const [ProjectData, setProjectData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [Open, setOpen] = useState(false);
  const [AccpetionKey , setAccpetionKey] = useState();
  const [success, Setsuccess] = useState(false);
  const [error, Seterror] = useState(false);
  const [isloading , setisloading] = useState(false)

  useEffect(() => {
    const getProjectData = async () => {
      await getProjects(setProjectData);
      setIsLoad(false);
    }
    getProjectData();
  }, [isLoad]);

  const OpenWarringBox = (key) => {
    setAccpetionKey(key);
    setOpen(true);
  }

  const acceptProject = async (key) => {
    setOpen(false)
    if (UserProfile.at(0).LastName === '' || UserProfile.at(0).FirstName === '' || UserProfile.at(0).phoneNumber === '' || UserProfile.at(0).Address === '' ){
      Seterror("First Complete your Profile.")
      return;
    }
    setisloading(true)
    await UpdateProjectStatus(key);
    setisloading(false)
    Setsuccess(true);
    setInterval(() => {
      Setsuccess(false)
    }, 10000);
    setIsLoad(true); // Reload the project data after updating the status
  }

  return (
    <Box m="20px">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Header title="Recent Projects" subtitle="Look Recent Projects" />
        <Typography variant="body1" display={"flex"} alignItems={"center"}> {ProjectData.filter(item => item.data.Status === 0).length } Projects're Avalible </Typography>
      </Box>
      {isloading ? (<LinearProgress sx={{mb: 2}} color='info' />) : null}
      {
        success ? (<Alert severity='success' sx={{mb: 4}}> Let's Start Working On Projects. </Alert>) : null
      }
      {
        error ? (<Alert severity='error' sx={{mb: 4}}> {error} </Alert>) : null
      }
      {isLoad ? (
        <LinearProgress color='info' />
      ) : (
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={{ "& div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
          {ProjectData.filter(item => item.data.Status === 0).map((item, index) => (
            <Box key={index}>
              <Card>
                <CardHeader title={item.data.ProjectName} variant={"lablesmall"} />
                <Divider />
                <CardContent>
                  <Tooltip title={<Typography> {item.data.Description} </Typography> }placeholder="right">
                    <Typography sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "5",
                      WebkitBoxOrient: "vertical",
                    }} >{item.data.Description}</Typography>
                  </Tooltip>
                  <br />
                  {(item.data.ResourcesLink || item.data.Attachment) ? (
                    <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                      {item.data.ResourcesLink && (
                        <Button variant='contained' color="secondary">
                          <Link to={item.data.ResourcesLink} target="_blank">
                              Resources Link 
                          </Link>
                        </Button>
                      )}
                      {item.data.Attachment && (
                        <Button variant='contained' color="secondary">
                          <Link href={item.data.Attachment} download={`${item.data.ProjectName}_Resources`}>
                            Download 
                          </Link>
                        </Button>
                      )}
                    </Box>
                  ) : (
                    <Typography>Resources are Not Available</Typography>
                  )}
                  <br />
                  <Box display="flex" flexDirection="row">
                    <Typography>{item.data.Department} Dept. || {dayjs(item.data.Deadline).format('DD-MM-YYYY (hh:MM A)')} </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="medium" fullWidth variant="contained" color="info" onClick={() => OpenWarringBox(item.key)}>
                    <b> Accept </b>
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      <Dialog
        open={Open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color={'yellow'}> Warring! </DialogTitle>
        <DialogContent>
          <Typography>
            Ready to Take on This Exciting Project?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => {setOpen(false)}}> No </Button>
          <Button color='success' onClick={() => acceptProject(AccpetionKey)}> Yes </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


export default Projects;

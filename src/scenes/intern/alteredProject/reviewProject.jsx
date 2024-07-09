import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, LinearProgress, Link, Tooltip, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { AcquireProject } from "../../../functions/intern/function";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const ReviewProjects = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const [ProjectData, setProjectData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const getProjectData = async () => {
      await AcquireProject(setProjectData);
      setIsLoad(false);
    }
    getProjectData();
  }, [isLoad]);



  return (
    <Box m="20px">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Header title="Your Projects" subtitle="Look Project History" />
        <Typography variant="body1" display={"flex"} alignItems={"center"}> {ProjectData.filter(item => item.data.Status === 2).length } Projects in your history </Typography>
      </Box>
      {isLoad ? (
        <LinearProgress color='info' />
      ) : (
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(1, minmax(0, 1fr))">
          {
          ProjectData.filter(item => item.data.Status === 2).length != 0 ? 
            (ProjectData.filter(item => item.data.Status === 2).map(item => (
              <Box key={item.key}>
                <Card fullWidth>
                  <Box display={'flex'} justifyContent={"space-between"} alignItems={"center"} marginRight={2}>
                      <Box display={'flex'} flexDirection={"column"} alignItems ={'center'}>
                          <CardHeader title={item.data.ProjectName} variant={"lablesmall"} />
                          <Typography variant="subtitle2"> {item.data.Department} Dept. </Typography>
                      </Box>
                      <Box component={"caption"}>
                          <Typography> Expire Date: </Typography>
                          <Typography color = {theme.palette.error.dark} fontWeight={theme.typography.fontWeightBold}> {dayjs(item.data.Deadline).format('DD-MM-YYYY (hh:MM A)')} </Typography>
                      </Box>
                  </Box>
                      <Divider />
                      
                      <CardContent>
                        <Tooltip title={<Typography> {item.data.Description} </Typography> } placement="top" fullWidth>
                          <Typography sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                          }} >{item.data.Description}</Typography>
                        </Tooltip>
                      </CardContent>

                      <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}} >
                        {/* {(item.data.ResourcesLink || item.data.Attachment) ? (
                            <Box display="flex" flexDirection="row" justifyContent='flex-start' gap={2}>
                            {item.data.ResourcesLink && (
                                <Link href={item.data.ResourcesLink} color={"#ffffff"} target="_blank">
                                  <Button variant='contained' color='secondary' disabled>
                                    Resources Link
                                  </Button>
                                </Link>
                            )}
                            {item.data.Attachment && (
                                <Link href={item.data.Attachment} color={"#ffffff"} download={`${item.data.ProjectName}_Resources`}>
                                  <Button variant='contained' color='secondary' disabled>
                                    Download
                                  </Button>
                                </Link>
                            )}
                            </Box>
                        ) : null} */}
                        <Button size="medium" variant="contained" color='success'>
                          <Link to={"/submitproject"} color={theme.palette.grey[300]} disabled>
                          <b>In Review</b>
                          </Link>
                        </Button>
                      </CardActions>
                </Card>
              </Box>
            ))) : 
            (
              <Box justifyContent={"center"} display={"flex"} alignItems={"center"} minHeight={100}>
                <Typography> Yets Record Not found </Typography>
              </Box>
            )
          }
        </Box>
      )}
    </Box>
  );
};

export default ReviewProjects;

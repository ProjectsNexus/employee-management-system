import * as React from 'react';
import * as yup from "yup";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Box, CircularProgress, MenuItem, Select, Typography, useMediaQuery } from '@mui/material';
import { Formik } from 'formik';
import { AcquireProject, CompletedProjectStatus } from "../../../functions/intern/function"
import Header from '../../../components/Header';
import { useEffect } from 'react';
import { green } from '@mui/material/colors';
export default function SubmitPorject(props) {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [projectData, setProjectData] = React.useState([]);
    const [message, Setmessage] = React.useState();

    
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const buttonSx = {
      ...(success && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
    };

    useEffect(() => {
      AcquireProject(setProjectData);
    })
    
  

  const handleFormSubmit = async (values) => {
    if (!loading) {
      setLoading(true);
    }

    await CompletedProjectStatus(values, Setmessage);

    setSuccess(true);
    setLoading(false);
  };
  return (
      <Box m="20px">
        <Header title="Submit Project" subtitle="Submit Project for Review" />

          <Typography marginBottom={2}>
            Please upload a ZIP file of your project files for review. After reviewing, we will update the project's status accordingly.
          </Typography>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            >
            {({
                values,
                errors,
                touched,
                setFieldValue,
                setFieldError,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
            <form onSubmit={handleSubmit}>
                {message ? (<Alert severity='warning' sx={{mb: 2}}> {message} </Alert>) : null}
                <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
                >
                <Select
                    fullWidth
                    variant="filled"
                    label="Project"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.project}
                    name="project"
                    error={!!touched.project && !!errors.project}
                    helperText={touched.project && errors.project}
                    sx={{ gridColumn: "span 4" }}>
                      <MenuItem value={"select project"}> Select Project</MenuItem>
                      {
                        projectData.filter(item => item.data.Status === 1).map((item) => (
                          <MenuItem value={item.key}> {item.data.ProjectName} </MenuItem>
                        ))
                      }
                    </Select>
                <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    variant="filled"
                    type="text"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 4" }}
                />
                <Typography sx={{gridColumn: "span 4"}} variant="label">
                    Resources (url or Attachment) 
                    <br/>
                    <Typography variant='body2' color={'yellow'}> <b>Attention:</b> If your project file exceeds 1 MB, please provide a Drive URL instead. </Typography>
                </Typography>
                <TextField
                    fullWidth
                    variant="filled"
                    type="url"
                    label="url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.url}
                    name="url"
                    error={!!touched.url && !!errors.url}
                    helperText={touched.url && errors.url}
                    sx={{ gridColumn: "span 2" }}
                />
                {/* <Typography sx={{gridColumn: "span"}} variant="label"> or </Typography> */}
                <TextField
                    fullWidth
                    variant="filled"
                    type="file"
                    label=""
                    onBlur={handleBlur}
                    onChange={
                    (e) => {
                    let fileReader = new FileReader()
                    if(e.target.files[0].type === "application/x-zip-compressed") {
                        if (e.target.files[0].size >= 10000) {
                        fileReader.onload = () => {
                            if (fileReader.readyState === 2) {
                            setFieldValue("media", fileReader.result);
                            // console.log(fileReader.result);
                            }
                        }
                        fileReader.readAsDataURL(e.target.files[0]);
                        } else {
                        setFieldError('media', 'Please upload Max 10 MB!')
                        }
                    } else {
                        setFieldError("media", 'Only zip format supported!')
                    }
                }
                }
                    // value={values.media}
                    name="media"
                    error={!!touched.media && !!errors.media}
                    helperText={touched.media && errors.media}
                    sx={{ gridColumn: "span 2" }}
                />
                </Box>
                {/* <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="success" variant="contained">
                      Submit Project
                  </Button>
                </Box> */}
                <Box sx={{ mt: 3, position: 'relative', display: 'flex', justifyContent:"end"}}>
                  <Button
                    variant="contained"
                    sx={buttonSx}
                    type="submit"
                    disabled={loading}
                    fullWidth
                    color="secondary"
                  >
                    Submit Project
                  </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
              </Box>
                </form>
            )}
        </Formik>
    </Box>
  
);

}
const checkoutSchema = yup.object().shape({
    project: yup.string().required("Please Select Project Which your Completed!"),
    description: yup.string().required("Description is Required!"),
    url: yup.string().url('Please Enter Valid Url!'),
    media: yup.mixed()
  });
  const initialValues = {
    project: "select project",
    description: "",
    media: "",
    url: "",
  };

import { Alert, Backdrop, Box, Button, CircularProgress, Fade, MenuItem, Modal, Select, TextField, Typography, colors, useTheme } from "@mui/material";
import { Formik, FormikProvider } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { uploadTask } from "../../../functions/admin/function";
import { useContext, useEffect, useRef, useState } from "react";
import LorderWithValueLabel from "../../global/loader";
import { green } from "@mui/material/colors";


const UploadProject = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const states = useContext(useContext)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const handleFormSubmit = async (values) => {
    if (!loading) {
      setLoading(true);
    }
    
    await uploadTask(values, setMessage, setOpen);
    
    setSuccess(true);
    setLoading(false);
  };

  
  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   // width: '100%',
  //   bgcolor: theme.palette.action.focusOpacity[0.5],
  //   // border: '2px solid #000',
  //   // boxShadow: 24,
  //   p: 4,
  // };
  return (
    <>
    <Box m="20px">
      <Header title="Upload Project" subtitle="Upload Project for Intern" />

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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {
                message ? (
                  <Alert severity={message === "Congratulations! Project Details Successfully Uploaded." ? 'success'  : 'error'} sx={{ gridColumn: "span 4" }}> {message} </Alert>
                ) : null
              }
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Project Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectname}
                name="projectname"
                error={!!touched.projectname && !!errors.projectname}
                helpertext={touched.projectname && errors.projectname}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="datetime-local"
                label=""
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.deadline}
                name="deadline"
                error={!!touched.deadline && !!errors.deadline}
                helpertext={touched.deadline && errors.deadline}
                sx={{ gridColumn: "span 2" }}
              />
              <Select
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dept}
                name="dept"
                error={!!touched.dept && !!errors.dept}
                helpertext={touched.dept && errors.dept}
                sx={{ gridColumn: "span 2" }}>
                  <MenuItem value={"Select Department"} selected> Select Department </MenuItem>
                  <MenuItem value={"Designing-Department"}> Designing Department </MenuItem>
                  <MenuItem value={"Development-Department"}> Development Department </MenuItem>
                  <MenuItem value={"Editing-Department"}> Editing Department </MenuItem>
                  <MenuItem value={"Marketing-Department"}> Marketing Department </MenuItem>
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
                helpertext={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <Typography sx={{gridColumn: "span 4"}} variant="label">
                Resources (url or Attachment) 
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
                helpertext={touched.url && errors.url}
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
                  if(!e.target) {
                    if(e.target.files[0].type === "application/x-zip-compressed" || e.target.files[0].type === "application/zip") {
                      if (e.target.files[0].size <= 1000000 ) {
                        fileReader.onload = () => {
                          if (fileReader.readyState === 2) {
                            setFieldValue("media", fileReader.result);
                            // console.log(fileReader.result);
                          }
                        }
                        fileReader.readAsDataURL(e.target.files[0]);
                      } else {
                        setFieldError('media', 'Please upload Max 1 MB!')
                      }
                    } else {
                        setFieldError("media", 'Only zip format supported!')
                    }
                  }
              }
            }
                // value={values.media}
                name="media"
                error={!!touched.media && !!errors.media}
                helpertext={touched.media && errors.media}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            {/* <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Upload Project
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
                Upload Project
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

        {/* {
          !open ? (<LorderWithValueLabel  sx={style} />) : null
        } */}
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
         <Fade in={!open}> 
          <Box sx={style}>
          </Box>
         </Fade> 
      </Modal> */}
    </Box>
    {/* <Box sx={style} >
      <CircularProgress color="info" />
    </Box> */}
    </>
  );
};

const checkoutSchema = yup.object().shape({
  projectname: yup.string().required("Project Name is Required"),
  deadline: yup.string().required("Deadline Date is Required!"),
  dept: yup.string().required("Please Select Department!"),
  description: yup.string().required("Description is Required!"),
  url: yup.string().url('Please Enter Valid Url!'),
  media: yup.mixed()
});
const initialValues = {
  projectname: "",
  deadline: "",
  dept: "Select Department",
  description: "",
  media: "",
  url: "",
};

export default UploadProject;

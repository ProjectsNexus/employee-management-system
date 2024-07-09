import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Edit, RemoveRedEye } from '@mui/icons-material';
import { Formik } from 'formik';
import * as yup from "yup";
import { green } from '@mui/material/colors';
import { UpdateProject } from '../../../functions/admin/function';
import { useState } from 'react';
import { Alert, Box, CircularProgress, MenuItem, Select, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { collection, getDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../../functions/firebase/config';
import { Intern } from '../../../data/UserData';
import { NotificationHander } from '../../../functions/auth';

export default function UpdataProject(props) {
  const Data = props.data;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")
  const InterDetial = {Name:"" , email:"" };
  const [inters, setintern] = useState(InterDetial);

  useEffect(() => {
    const getInternDetails = async () => {
      const uid = Data.InternUid;
  
      await getDocs(collection(db, auth.currentUser.displayName, uid, 'Profile')).then((doc) => {
        doc.forEach((docs) => {
          setintern({email: docs.data().email, Name: docs.data().FirstName + " " + docs.data().LastName})
        })
      })
      return
    }

    getInternDetails()
    return
  })

  const handleFormSubmit = async (values) => {
    await UpdateProject(values, setMessage, setOpen, Data);

  };
  
  const DeleteProject = async (key) => {
    const CompanyName = auth.currentUser.displayName;
    await deleteDoc(doc(collection(db, CompanyName, "Projects", "NewProjects"), key));
    
    NotificationHander('Project Delete', 'This is to notify you that there has been an Delete to the project you are involved in.', null, null)
    
    setOpen(false)
  }
  
  
  const checkoutSchema = yup.object().shape({
    projectname: yup.string().required("Project Name is Required"),
    deadline: yup.string().required("Deadline Date is Required!"),
    dept: yup.string().required("Please Select Department!"),
    description: yup.string().required("Description is Required!"),
    url: yup.string().url('Please Enter Valid Url!'),
    media: yup.mixed()
  });
  const initialValues = {
    projectname: Data.ProjectName,
    deadline: Data.Deadline,
    dept: Data.Department,
    description: Data.Description,
    media: Data.Attachment,
    url: Data.ResourcesLink,
  };

  return (
    <React.Fragment>
      <Button onClick={() => {setOpen(true)}}>
        {Data.Status === 0  ? (<Edit color='info' />) : (<RemoveRedEye color='secondary' />) }
      </Button>
      <Dialog
        open={open}
        onClose={() => (setOpen(false))}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        <DialogTitle>Update Porjects</DialogTitle>
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
                <DialogContent>
                  {Data.Status != 0 ? (<DialogContentText>
                    This Project Accepted by <em> <b> {inters.Name} </b> </em>, Who email is <em> <b> {inters.email} </b> </em>. <br />
                  </DialogContentText>) :  null}
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
                        <MenuItem value={"Editing-Department"}>  Editing Department </MenuItem>
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
                </DialogContent>
                <DialogActions>
                  <Button color='error' onClick={() => (setOpen(false))}>Cancel</Button>
                  <Button color='error' onClick={() => DeleteProject(Data.key)}>Delete</Button>
                  <Button type='submit' color='success'>Update</Button>
                </DialogActions>
              </form>
            )}
          </Formik>
      </Dialog>
    </React.Fragment>
  );
}

import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, LinearProgress, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { UserProfile } from "../../../data/UserData";
import { UpdateUserProfile, getUserData } from "../../../functions/auth";
import { updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../../functions/firebase/config";


const AdminPorfile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = useState();
  const [ChangeCredentialsrmessage, setChangeCredentialsrmessage] = useState();
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const isadmin = UserProfile.at(0).IsAdmin;
  useEffect(() => {
    getUserData();
  })

  const handleFormSubmit = async (values) => {
      setloader(true);
      await UpdateUserProfile(values, setMessage)
      setloader(false)
      setInterval(() => {
        setMessage('');
        }, 9000);
        
    };
        
        
  const emailVerified = UserProfile.at(0).emailVerified;
  
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Please Enter Valid First Name"),
  lastName: yup.string().required("Please Enter Valid Last Name"),
  email: yup.string().email("invalid email").required("Please Enter Valid Email"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  desig: yup.string().required("Please Enter Valid Designation"),
  dept: yup.string().required("Please Enter Valid Department"),
  address: yup.string().required("Please Enter Valid Address"),
});

const initialValues = {
  firstName: UserProfile.at(0).FirstName || "",
  lastName: UserProfile.at(0).LastName || "",
  email: UserProfile.at(0).email || "",
  password: UserProfile.at(0).password || "",
  username: UserProfile.at(0).username || "",
  contact: UserProfile.at(0).phoneNumber || "",
  desig: UserProfile.at(0).desination || "",
  dept: UserProfile.at(0).department || "",
  address: UserProfile.at(0).Address || "",
};


  return (
    <Box m="20px">

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Header title={"Profile" } subtitle="Manage your Profile" />
                <Button type="submit" color='info' variant="contained">
                  <b> Update Profile </b>
                </Button>
              </Box>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                pb={5}
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
              >
                {message ? (<Alert severity={message === 'Profile Updated!' ? 'success' : 'error'} sx={{gridColumn: "span 4"}}> {message} </Alert>) : null}
                
                {loader ? (<LinearProgress color='info' sx={{gridColumn: "span 4"}} />) : null}
                <Box display={'flex'} justifyContent={'space-between'} sx={{gridColumn: 'span 4'}}>
                  <Typography variant='h5' fontWeight={600} sx={{gridColumn: "span 4"}}> login Credentials: </Typography>
                    <Tooltip title={!emailVerified ? (<Typography color={'yellow'}>Please First Verified your email!</Typography>) : ''} placement='left'>
                      <Button color='info' onClick={() => {setOpen(true)}} >
                        Change Email or Password
                      </Button>
                    </Tooltip>
                </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helpertext={touched.email && errors.email}
                  disabled
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helpertext={touched.password && errors.password}
                  disabled
                  sx={{ gridColumn: "span 4" }}
                />

                <Typography variant='h5' fontWeight={600} sx={{gridColumn: "span 4"}}> Pesonal Details: </Typography>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helpertext={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helpertext={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helpertext={touched.username && errors.username}
                  disabled
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="tel"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  disabled={!isadmin ? true : false}
                  error={!!touched.contact && !!errors.contact}
                  helpertext={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Designation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={!isadmin ? values.desig : ''}
                  name="desig"
                  error={!!touched.desig && !!errors.desig}
                  helpertext={touched.desig && errors.desig}
                  disabled = {!isadmin ? false : true}
                  sx={{ gridColumn: "span 4" }}
                />
                <Select
                  fullWidth
                  variant="filled"
                  label="Department"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={!isadmin ? values.dept : ''}
                  name="dept"
                  error={!!touched.dept && !!errors.dept}
                  helpertext={touched.dept && errors.dept}
                  disabled = {!isadmin ? false : true}
                  sx={{ gridColumn: "span 4" }}>
                      <MenuItem value={0} selected> Select Department </MenuItem>
                      <MenuItem value={"Designing Department"} > Designing Department </MenuItem>
                      <MenuItem value={"Development Department"} > Development Department </MenuItem>
                      <MenuItem value={"Editing Department"} > Editing Department </MenuItem>
                      <MenuItem value={"Marketing  Department"} > Marketing  Department </MenuItem>
                </Select>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helpertext={touched.address && errors.address}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              {/* <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update Profile
                </Button>
              </Box> */}
              </form>
        )}
      </Formik>
      
      
      <Dialog
        open={open}
        onClose={() => {setOpen(false)}}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            try {
              await updateEmail(auth.currentUser, formJson.email)
              await updatePassword(auth.currentUser, formJson.password)
              setOpen(false);
            } catch (e) {
              setChangeCredentialsrmessage(e.message)
            }
          },
        }}
      >
        <DialogTitle>Change Login Credentials</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          {ChangeCredentialsrmessage ? (<Alert severity="error"> {ChangeCredentialsrmessage} </Alert>) : null}
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false); setChangeCredentialsrmessage('')}}>Cancel</Button>
          <Button type="submit">Change</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


export default AdminPorfile;

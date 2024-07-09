import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Formik, FormikProvider } from "formik";
import * as yup from "yup";
import { Alert, Box, FilledInput, InputAdornment, MenuItem, Select, TextField, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CreateInternAccount } from '../../../functions/auth';
import LorderWithValueLabel from '../../global/loader';
import user from '../../../functions/context/userState';
import { auth } from '../../../functions/firebase/config';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddIntern(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(true);
  const [isload, setisload] = useState(false);
  const [error, seterror] = useState("");
  const [Success, setSuccees] = useState(false);
  const [User] = React.useContext(user)

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleFormSubmit = async (values) => {
    console.log(User);
    const CompanyName = auth.currentUser.displayName;
    await CreateInternAccount(values, setSuccees, setisload, seterror, CompanyName)
  };

  
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        maxWidth={"md "}
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Add Intern
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
              { 
                error != "" ? (
                  <Alert severity='error'> {error} </Alert>
                ) : null
              }
              {
                Success ? (
                  <Alert severity='success'> Intern User Created </Alert>
                ) : null
              }
              {isload ? 
              (<LorderWithValueLabel />) 
              :
              (<Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                padding={2}
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
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
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 2" }}
                />
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
                  helperText={touched.email && errors.email}
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
                  helperText={touched.dept && errors.dept}
                  sx={{ gridColumn: "span 2" }}>
                    <MenuItem value={"Select Department"} selected> Select Department </MenuItem>
                    <MenuItem value={"Designing Department"}> Designing Department </MenuItem>
                    <MenuItem value={"Development Department"}> Development Department </MenuItem>
                    <MenuItem value={"Editing Department"}> Editing Department </MenuItem>
                    <MenuItem value={"Marketing Department"}> Marketing Department </MenuItem>
                </Select>
                <Select
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Designation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.desig}
                  name="desig"
                  error={!!touched.desig && !!errors.desig}
                  helperText={touched.desig && errors.desig}
                  sx={{ gridColumn: "span 2" }}>
                    <MenuItem value={"Select Desgination"} selected> Select Desgination </MenuItem>
                    <MenuItem value={"GM"}> General Manager </MenuItem>
                    <MenuItem value={"Intern"}> Intern </MenuItem>
                </Select>
                <FilledInput
                  fullWidth
                  variant="filled"
                  type={showPassword ? "Text" : "password"}
                  endAdornment={
                      <>
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {setShowPassword(true)}}
                            onMouseDown={() => {setShowPassword(false)}}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      </>
                  }
                  label="Password"
                  placeholder='Password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* <Button onClick={() => {(generateCustomPassword(8, values.password))}} 
                  sx={{ gridColumn: "span 1" }} 
                  variant="contained" 
                  color="primary">
                  Generate
                </Button> */}
              </Box>)
              }
              {/* <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Upload Project
                </Button>
              </Box> */}
            </form>
          )}
        </Formik>
      </Dialog>
    </React.Fragment>
  );
}


const checkoutSchema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  email: yup.string().required("Email is Required!").email('Please Enter valid Email'),
  dept: yup.string().required("Please Select Department!"),
  desig: yup.string().required("Please Select Desgination!"),
  password: yup.string().required("Password is Required").min(6, "Password lenght don't less than 6 charactor").max(16, "Password lenght don't more than 16 charactor").lowercase("Password Must be LowerCase Charactors").uppercase("Password Must be UpperCase Charactors"),
});
const initialValues = {
  username: "",
  email: "",
  dept: "Select Department",
  desig: "Select Desgination",
  password: "",
};

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import { Formik } from "formik";
// import * as yup from "yup";
// import { Box, Divider, FilledInput, InputAdornment, MenuItem, Select, TextField, useMediaQuery } from '@mui/material';
// import { useState } from 'react';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { CreateInternAccount } from '../../../functions/auth';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function AddIntern(props) {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const [showPassword, setShowPassword] = useState(false);
//   const [forms, setForms] = useState([initialValues]);

//   const handleClickOpen = () => {
//     props.setOpen(true);
//   };

//   const handleClose = () => {
//     props.setOpen(false);
//   };

//   const handleFormSubmit = async (values) => {
//     await CreateInternAccount(values);
//     props.setOpen(false); // Close dialog after form submission
//   };

//   const addNewForm = () => {
//     setForms([...forms, initialValues]);
//   };

//   return (
//     <React.Fragment>
//       <Dialog
//         fullScreen
//         open={props.open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar sx={{ position: 'relative' }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleClose}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               Add Intern
//             </Typography>
//             <Button autoFocus color="inherit" onClick={handleFormSubmit}>
//               Save
//             </Button>
//           </Toolbar>
//         </AppBar>
//         {forms.map((form, index) => (
//           <Formik
//             key={index}
//             onSubmit={handleFormSubmit}
//             initialValues={form}
//             validationSchema={checkoutSchema}
//           >
//             {({
//               values,
//               errors,
//               touched,
//               handleBlur,
//               handleChange,
//               handleSubmit,
//             }) => (
//               <form onSubmit={handleSubmit}>
//                 <Box
//                   display="grid"
//                   gap="30px"
//                   gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//                   padding={2}
//                   sx={{
//                     "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//                   }}
//                 >
//                   <Typography sx={{gridColumn: "span 4"}} variant='h3'> {values.username} </Typography>
//                   <Divider sx={{gridColumn: "span 4"}}/>
//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="Username"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.username}
//                     name="username"
//                     error={!!touched.username && !!errors.username}
//                     helperText={touched.username && errors.username}
//                     sx={{ gridColumn: "span 2" }}
//                   />
//                   <TextField
//                     fullWidth
//                     variant="filled"
//                     type="email"
//                     label="Email"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.email}
//                     name="email"
//                     error={!!touched.email && !!errors.email}
//                     helperText={touched.email && errors.email}
//                     sx={{ gridColumn: "span 2" }}
//                   />
//                   <Select
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="Department"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.dept}
//                     name="dept"
//                     error={!!touched.dept && !!errors.dept}
//                     helperText={touched.dept && errors.dept}
//                     sx={{ gridColumn: "span 2" }}
//                   >
//                     <MenuItem value={"Select Department"} selected> Select Department </MenuItem>
//                     <MenuItem value={"Designing Department"}> Designing Department </MenuItem>
//                     <MenuItem value={"Development Department"}> Development Department </MenuItem>
//                     <MenuItem value={"Editing Department"}> Editing Department </MenuItem>
//                     <MenuItem value={"Marketing Department"}> Marketing Department </MenuItem>
//                   </Select>
//                   <Select
//                     fullWidth
//                     variant="filled"
//                     type="text"
//                     label="Designation"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.desig}
//                     name="desig"
//                     error={!!touched.desig && !!errors.desig}
//                     helperText={touched.desig && errors.desig}
//                     sx={{ gridColumn: "span 2" }}>
//                       <MenuItem value={"Select Desgination"} selected> Select Desgination </MenuItem>
//                       <MenuItem value={"GM"}> General Manager </MenuItem>
//                       <MenuItem value={"Intern"}> Intern </MenuItem>
//                   </Select>
//                   <FilledInput
//                     fullWidth
//                     variant="filled"
//                     type={showPassword ? "text" : "password"}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     label="Password"
//                     placeholder='Password'
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.password}
//                     name="password"
//                     error={!!touched.password && !!errors.password}
//                     helperText={touched.password && errors.password}
//                     sx={{ gridColumn: "span 4" }}
//                   />
//                 </Box>
//               </form>
//             )}
//           </Formik>
//         ))}
//         <Box display="flex" justifyContent="end" mt="20px" p={2}>
//           <Button color="secondary" variant="contained" onClick={addNewForm}>
//             Add Another Intern
//           </Button>
//         </Box>
//       </Dialog>
//     </React.Fragment>
//   );
// }


// const checkoutSchema = yup.object().shape({
//   username: yup.string().required("Username is Required"),
//   email: yup.string().required("Email is Required!").email('Please Enter valid Email'),
//   dept: yup.string().required("Please Select Department!"),
//   desig: yup.string().required("Please Select Desgination!"),
//   password: yup.string().required("Password is Required").min(6, "Password lenght don't less than 6 charactor").max(16, "Password lenght don't more than 16 charactor").lowercase("Password Must be LowerCase Charactors").uppercase("Password Must be UpperCase Charactors"),
// });
// const initialValues = {
//   username: "",
//   email: "",
//   dept: "Select Department",
//   desig: "Select Desgination",
//   password: "",
// };
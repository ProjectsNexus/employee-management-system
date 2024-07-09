import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import * as yup from "yup";
import { CreateAdminAccount } from '../../functions/auth';
import { Alert, FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import user from '../../functions/context/userState';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.cre8ivcove.com/">
        Cre8ivCove
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function SignUp(props) {
  const theme = useTheme()
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, seterror] = React.useState([]);

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

  const [CurrentUser , SetCurrentUser] = React.useContext(user);
 
  const ShowPasswordHandler = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }
  const handleFormSubmit =  async (values) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      await CreateAdminAccount(values, SetCurrentUser, seterror);

      setSuccess(true);
      setLoading(false);
    }
  };

  
  const checkoutSchema = yup.object().shape({
    fristname: yup.string().required("First Name is Required!"),
    lastname: yup.string().required("Last Name is Required!"),
    username: yup.mixed().required("Username is Required!"),
    email: yup.string().email("Please Enter Valid E-mail!").required("E-mail is Required!"),
    password: yup.string().required("Password is Required").min(6, "Password Lenght should not less than 6 charactors").max(16, "Password Lenght should not more than 16 charactors"),
    // .matches('/a-z/', "Password Should have lastest one LowerCase Charactor.").matches('/A-Z/', "Password Should have lastest one UpperCase Charactor.").matches('/0-9/', "Password Should have lastest one Numberic Charactor."),
    phonenumber: yup.number().required("Phone Number is Required!"),
    companyname: yup.string().required("Company Name is Required!"),
    TandC: yup.boolean().oneOf([false], "You must accept the terms and conditions")
  });
  const initialValues = {
    fristname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    companyname: "",
    TandC: "Remamber" 
  };
  

  return (
    
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={5} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create a free Account
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
                        handleBlur,
                        handleChange,
                        handleSubmit,
                }) => (
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                          {
                            error.length != 0 ?
                              (
                                <Alert severity="error"> {error} </Alert>
                              )
                            : null
                          }

                          <TextField fullWidth variant="filled" type="text" label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.fristname} name="fristname" error={!!touched.fristname && !!errors.fristname} helpertext={touched.fristname && errors.fristname} sx={{mt: 1}}/>

                          <TextField fullWidth variant="filled" type="text" label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastname} name="lastname" error={!!touched.lastname && !!errors.lastname} helpertext={touched.lastname && errors.lastname} sx={{mt: 1}}/>

                            
                          <TextField fullWidth variant="filled" type="text" label="username" onBlur={handleBlur} onChange={handleChange} value={values.username} name="username" error={!!touched.username && !!errors.username} helpertext={touched.username && errors.username} sx={{mt: 1}}/>

                          <TextField fullWidth variant="filled" type="email" label="E-mail" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={!!touched.email && !!errors.email} helpertext={touched.email && errors.email} sx={{mt: 1}}/>

                          <Box>
                            <TextField
                              fullWidth variant="filled" type={showPassword ? "text" : "password"} placeholder='Password' label="Password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" error={!!touched.password && !!errors.password} helpertext={touched.password && errors.password} sx={{mt: 1}}
                            />
                            <FormControlLabel control={<Checkbox onClick={() => ShowPasswordHandler() } />} label={!showPassword ? "Show Password" : 'Hidden Password'} />
                          </Box>

                          <TextField fullWidth variant="filled" type="text" label="Phone Number" onBlur={handleBlur} onChange={handleChange} value={values.phonenumber} name="phonenumber" error={!!touched.phonenumber && !!errors.phonenumber} helpertext={touched.phonenumber && errors.phonenumber} sx={{mt: 1}}/>

                          <TextField fullWidth variant="filled" type="text" label="Company Name" onBlur={handleBlur} onChange={handleChange} value={values.companyname} name="companyname" error={!!touched.companyname && !!errors.companyname} helpertext={touched.companyname && errors.companyname} sx={{mt: 1}}/>

                          <FormControlLabel
                            control={<Checkbox color="default" onBlur={handleBlur} onChange={handleChange} value={values.TandC} name='TandC'/>}
                            label="Agree to Terms and Conditions" 
                          />
                          {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="secondary"
                          >
                            <b>Create a Free Account</b>
                          </Button> */}
                           <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                              variant="contained"
                              type='submit'
                              sx={buttonSx}
                              disabled={loading}
                              fullWidth
                              color="secondary"
                            >
                              Create a Free Account
                            </Button>
                            {loading && (
                              <CircularProgress
                                size={24}
                                sx={{
                                  color: green[500],
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  marginTop: '-12px',
                                  marginLeft: '-12px',
                                }}
                              />
                            )}
                          </Box>
                          <Grid container>
                            {/* <Grid item xs>
                              <Link href="#" variant="body2" color={theme.palette.grey[200]}>
                                Forgot password?
                              </Link>
                            </Grid> */}
                            <Grid item>
                              <Button onClick={() => {props.setislogin(true)}} variant="body2" color={theme.palette.grey[200]}> {"I have already an account?"}
                              </Button>
                            </Grid>
                          </Grid>
                          <Copyright sx={{ mt: 5 }} />
                        </Box>
                    )}
                </Formik>
              </Box>
            </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://img.freepik.com/premium-vector/wavy-layers-black-paper-background_115579-1222.jpg?w=740',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'left',
            }}
          />
        </Grid>
  );
}
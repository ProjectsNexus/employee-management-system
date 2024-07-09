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
import { CreateAdminAccount, SigninUser } from '../../functions/auth';
import { Alert, CircularProgress, FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import user from '../../functions/context/userState';
import { green } from '@mui/material/colors';

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

  const handleFormSubmit = async (values) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      await SigninUser(values, SetCurrentUser, seterror);

      setSuccess(true);
      setLoading(false);
    }
  };

  
  const checkoutSchema = yup.object().shape({
    email: yup.string().email("Please Enter Valid E-mail!").required("E-mail is Required!"),
    password: yup.string().required("Password is Required").min(6, "Password Lenght should not less than 6 charactors").max(16, "Password Lenght should not more than 16 charactors"),
    // .matches('/a-z/', "Password Should have lastest one LowerCase Charactor.").matches('/A-Z/', "Password Should have lastest one UpperCase Charactor.").matches('/0-9/', "Password Should have lastest one Numberic Charactor."),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  

  return (
    
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://img.freepik.com/free-vector/abstract-background-design-black_53876-43542.jpg?t=st=1716893015~exp=1716896615~hmac=f7866c600d853f591d1d9feb9b3cdf7489bdc74ec9dd04342e058b9e880aac6d&w=740)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
          />
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
                              (<Alert severity="error" > {error} </Alert>)
                            : null
                          }

                          <TextField fullWidth variant="filled" type="email" label="E-mail" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} sx={{mt: 1}}/>

                          <TextField fullWidth variant="filled" type={showPassword ? "text" : "password"} placeholder='Password' label="Password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" error={!!touched.password && !!errors.password} helpertext={touched.password && errors.password} sx={{mt: 1}}
                          />
                            

                          {/* <TextField fullWidth variant="filled" type="text" label="Company Name" onBlur={handleBlur} onChange={handleChange} value={values.companyname} name="companyname" error={!!touched.companyname && !!errors.companyname} helperText={touched.companyname && errors.companyname} sx={{mt: 1}}/> */}

                          <FormControlLabel control={<Checkbox onClick={() => ShowPasswordHandler() } />} label={!showPassword ? "Show Password" : 'Hidden Password'} color="default" />

                          {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="secondary"
                          >
                            <b>SignIn</b>
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
                              Singin
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
                            <Grid item xs>
                              {/* <Link href="#" variant="body2" color={theme.palette.grey[200]}>
                                Forgot password?
                              </Link> */}
                              <FormControlLabel
                                control={<Checkbox value="remember" color="default" />}
                                label="Remind me"
                              />
                            </Grid>
                            <Grid item>
                              <Button onClick={() => {props.setislogin(false)}} variant="body2" color={theme.palette.grey[200]}> {"Do't have an account?"}
                              </Button>
                            </Grid>
                          </Grid>
                          <Copyright sx={{ mt: 5 }} />
                        </Box>
                    )}
                </Formik>
              </Box>
            </Grid>
        </Grid>
  );
}



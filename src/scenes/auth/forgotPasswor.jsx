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
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import * as yup from "yup";
import { SigninUser } from '../../functions/auth';

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


export default function ForgotPassword(props) {
  const theme = useTheme()
  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleFormSubmit = (values) => {
    // console.log(values)
    SigninUser(values)
  };
  
  const checkoutSchema = yup.object().shape({
    username: yup.string().required("Username is Required!"),
    email: yup.string().email("Please Enter Valid E-mail!").required("E-mail is Required!"),
    companyname: yup.string().required("Company Name is Required!"),
  });
  const initialValues = {
    username: "",
    email: "",
    companyname: "",
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
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square>
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
                Sign in
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
                          {/* <TextField fullWidth variant="filled" type="text" label="username" onBlur={handleBlur} onChange={handleChange} value={values.username} name="username" error={!!touched.username && !!errors.username} helperText={touched.username && errors.username} sx={{mt: 1}}/> */}

                          <TextField fullWidth variant="filled" type="text" label="E-mail" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} sx={{mt: 1}}/>
                          
                          {/* <TextField fullWidth variant="filled" type={showPassword ? "text" : "password"} placeholder='Password' label="Password" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} sx={{mt: 1}} endAdornment={ <InputAdornment position="end" sx={{mr: 2}}> <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" > {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment> }/> */}

                          {/* <TextField fullWidth variant="filled" type="text" label="Company Name" onBlur={handleBlur} onChange={handleChange} value={values.companyname} name="companyname" error={!!touched.companyname && !!errors.companyname} helperText={touched.companyname && errors.companyname} sx={{mt: 1}}/> */}

                          <FormControlLabel
                            control={<Checkbox value="remember" color="default" />}
                            label="Remind me!"
                          />
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="secondary"
                          >
                            <b>Sent Email</b>
                          </Button>
                          <Grid container>
                            <Grid item xs>
                              {/* <Button onClick={() => {props.setislogin(2)}} variant="body2" color={theme.palette.grey[200]}>
                                Forgot password?
                              </Button> */}
                            </Grid>
                            <Grid item>
                              <Button onClick={() => {props.setislogin(1)}} variant="body2" color={theme.palette.grey[200]}>
                                {"Do't have an account?"}
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



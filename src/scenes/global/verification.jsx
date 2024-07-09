import { Box, Button, Card, CardActions, CardContent, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'
import { CardTitle } from 'react-trello/dist/styles/Base'
import { UserProfile } from '../../data/UserData';

const Verification = () => {
  const theme = useTheme();
  const fullname = UserProfile.at(0).FirstName + " " + UserProfile.at(0).LastName;
  const email = UserProfile.at(0).email;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: theme.palette.action.focusOpacity[0.5],
    // border: '2px solid #000',
    boxShadow: 5,
    p: 2,
  };

  return (
      <Card sx={style}>
          <CardContent>
            <Typography variant='h3' fontWeight={900} sx={{pb: 1}}> Email Verification: </Typography>
            <Divider />
            <Typography sx={{pt: 1}}>
              Hi {fullname}, Please verify your email address by clicking the linek sent to <b> {email} </b>
            </Typography>
          </CardContent>
          <CardActions>
            <Button fullWidth color='primary' href={"mailto:" + email} variant='contained'> <b> Resend Verification Email </b> </Button>
          </CardActions>
      </Card>
)
}

export default Verification
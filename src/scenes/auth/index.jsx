import React, { useContext, useEffect, useState } from 'react'
import SignIn from './signin'
import SignUp from './signup'
import user from '../../functions/context/userState';
import LorderWithValueLabel from '../global/loader';
import { TurnLeft } from '@mui/icons-material';
import { LoginBack } from '../../functions/auth';
import { UserProfile } from '../../data/UserData';
import { Box, CircularProgress } from '@mui/material';

const Auth = () => {
  const [islogin , setislogin] = useState(true);
  const [isloading, setisloading] = useState(true)
  const [CurrentUser, SetCurrentUser] = useContext(user)
  
  useEffect(() => {
    LoginBack(SetCurrentUser, setisloading, isloading);

  }, [CurrentUser])

  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
      <>
        {isloading
          ?
          (<Box sx={style}> <CircularProgress color='error' /> </Box>) // true
          :
          (
            <>
              {islogin
                ?  
                (<SignIn setislogin={setislogin} />) // true
                :
                (<SignUp setislogin={setislogin} />) // false 
              }
            </>
          )
        }
      </>
  )
}

export default Auth
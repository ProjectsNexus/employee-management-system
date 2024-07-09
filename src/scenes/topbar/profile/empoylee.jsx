import { Box, Typography } from '@mui/material'
import React from 'react'
import Header from '../../../components/Header'

const EmpoyleeProfile = () => {
  return (
    <Box m='20px'>
        <Header title={"Profile" } subtitle="Manage your Profile" />

        <Typography>
            Please Contact the your HR for Change your Porfile.
        </Typography>
    </Box>
  )
}

export default EmpoyleeProfile
import { NotificationsOutlined } from '@mui/icons-material'
import { Badge, Box, Card, CardContent, Divider, Drawer, IconButton, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CardTitle } from 'react-trello/dist/styles/Base';
import Header from '../../../components/Header';
import { UserNotification } from '../../../data/UserData';
import { UpdateNofiticationStatus } from '../../../functions/intern/function';
import { Link } from 'react-router-dom';

const Notification = () => {
    const [open, setopen] = useState(false);
    const theme = useTheme();
    const unreadMessages = UserNotification.at(0).filter((item) => item.data.status === 0 && item.data.title != null).length
    
  return (
    <>
        <Link>
            <IconButton onClick={() => setopen(true)}>
                <Badge badgeContent={unreadMessages} color='error' >
                    <NotificationsOutlined />
                </Badge>
            </IconButton>
        </Link>
        <Drawer open={open} onClose={() => setopen(false)} anchor='right'>
            <Box padding={2} width={400}>
                <Header title={'Notification'}/>
                {UserNotification.at(0).filter((item) => item.data.title != null).map((item, index) => (
                    <Card key={index+1} sx={{background: item.data.status != 0 ? (theme.palette.background.paper) : (theme.palette.background.default), cursor: 'pointer', marginY: 1}} onClick={() => UpdateNofiticationStatus(item.key)}>
                        <CardContent>
                            <Typography variant='h5' fontWeight={700}> {item.data.title} </Typography> 
                            <Divider sx={{marginBottom: 1}} />
                            <Typography> {item.data.content} </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Drawer>
    </>
  )
}

export default Notification
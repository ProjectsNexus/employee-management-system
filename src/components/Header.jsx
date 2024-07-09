import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { auth } from "../functions/firebase/config";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title} {title === 'Profile' ? (auth.currentUser.emailVerified  ? (<VerifiedUserIcon color="info" />) : (<GppBadIcon color="error" />)) : null }
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle} <br/>
        {title === 'Profile' ? (
          !auth.currentUser.emailVerified ? (
              <Link color={colors.redAccent[200]} onClick={() => {sendEmailVerification(auth.currentUser)}}> Resend Verification Email </Link>
                  ) : null
        ) :  null }
      </Typography>
    </Box>
  );
};

export default Header;

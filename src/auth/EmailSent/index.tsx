import { FC } from 'react';
import { Button, Container, Typography, Theme, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { navHeight, navHeight2, searchbarHeight } from '~/styles/constants';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: navHeight + searchbarHeight,
    paddingTop: 32,
    paddingBottom: 64,
    [theme.breakpoints.up('md')]: {
      marginTop: navHeight2,
    },
  },
}));

const EmailSent: FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography gutterBottom variant="h5" sx={{ mb: 2 }}>
        The link for password change has been sent to your email.
      </Typography>
      <Typography gutterBottom variant="body2" sx={{ mb: 2 }}>
        To create new password, click on the link in email and enter new
        password.
      </Typography>
      <Typography gutterBottom variant="body2" sx={{ mb: 3 }}>
        Didn't get an email? Check 'Spam' folder. Also you can send another
        email by clicking on the button below.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to="/auth/forgot-password"
        >
          Send Another Email
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to="/auth/login"
        >
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default EmailSent;

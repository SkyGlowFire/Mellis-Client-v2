import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Typography, Theme } from '@mui/material';
import { FC } from 'react';
import HoverBox from '~/common/components/HoverBox/HoverBox';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: 260,
    [theme.breakpoints.up('md')]: {
      width: 350,
    },
  },
  box: {
    width: '100%',
    padding: '1rem',
  },
  colored: {
    backgroundColor: theme.palette.info.light,
  },
  btn: {
    display: 'inline-block',
    padding: '.2rem 1rem',
    borderRadius: '.2rem',
  },
}));

interface LoginWindowProps {
  onClose: () => void;
}

const LoginWindow: FC<LoginWindowProps> = ({ onClose }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.box} id="profile-box">
        <Typography style={{ marginBottom: '2rem' }}>
          Already have an account?
        </Typography>
        <HoverBox
          dark
          color="primary"
          type="link"
          to="/auth/login"
          className={classes.btn}
          onClick={onClose}
        >
          Log In
        </HoverBox>
      </div>
      <div className={clsx(classes.box, classes.colored)}>
        <Typography style={{ marginBottom: '2rem' }}>
          First time here?
        </Typography>
        <HoverBox
          dark
          color="primary"
          type="link"
          to="/auth/signup"
          className={classes.btn}
          onClick={onClose}
        >
          Sign Up
        </HoverBox>
      </div>
    </div>
  );
};

export default LoginWindow;

import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router';
import { Grid } from '@mui/material';
import GoogleButton from './GoogleButton';
import VkButton from './VkButton';

const useStyles = makeStyles({
  icon: {
    cursor: 'pointer',
    transition: 'all .3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});

const API_URI = process.env.REACT_APP_API_URI;

const SocialButtons = () => {
  const classes = useStyles();
  const searchParams = new URLSearchParams(useLocation().search);
  const fromUrl = searchParams.get('from') || '/profile/info';

  const loginFacebook = () => {
    window.open(`${API_URI}/auth/login-facebook?from=${fromUrl}`, '_self');
  };

  return (
    <Grid container gap={2} justifyContent="center" sx={{ mb: 2 }}>
      <GoogleButton />
      <VkButton />
    </Grid>
  );
};

export default SocialButtons;

import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { SvgIcon, Grid } from '@mui/material';
import { ReactComponent as VkIcon } from './images/vk.svg';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from './GoogleButton';

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

  const loginGoogle = () => {
    window.open(`${API_URI}/auth/login-google?from=${fromUrl}`, '_self');
  };

  const loginFacebook = () => {
    window.open(`${API_URI}/auth/login-facebook?from=${fromUrl}`, '_self');
  };

  const loginVk = () => {
    window.open(`${API_URI}/auth/login-vkontakte?from=${fromUrl}`, '_self');
  };

  return (
    <Grid container gap={2} justifyContent="center" sx={{ mb: 2 }}>
      <SvgIcon
        className={classes.icon}
        component={FacebookRoundedIcon}
        sx={{ color: '#3b5998' }}
        fontSize="large"
        onClick={loginFacebook}
      />
      {/* <SvgIcon
        className={classes.icon}
        component={GoogleIcon}
        sx={{ color: '#dc4e41' }}
        fontSize="large"
        onClick={loginGoogle}
      /> */}
      <GoogleButton />
      <SvgIcon
        className={classes.icon}
        component={VkIcon}
        viewBox="0 0 200 200"
        onClick={loginVk}
        fontSize="large"
      />
      {/* <SvgIcon
        className={classes.icon}
        component={InstagramIcon}
        sx={{ color: '#3f729b' }}
        fontSize="large"
      /> */}
    </Grid>
  );
};

export default SocialButtons;

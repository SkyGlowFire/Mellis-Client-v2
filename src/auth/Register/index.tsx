import { useForm, FormProvider } from 'react-hook-form';
import {
  Button,
  Container,
  Typography,
  Link as MuiLink,
  Theme,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useLocation, Redirect, Link } from 'react-router-dom';
import TextInputWithIcon from '~/common/components/react-hook-form-inputs/TextInputWithIcon/TextInputWithIcon';
import PasswordInput from '~/common/components/react-hook-form-inputs/PasswordInput/PasswordInput';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signUp, clearAuthError } from '~/auth/state/authSlice';
import { SignUpUserDto } from '~/auth/state/dto/loginUser.dto';
import { setAlert } from '~/alerts/alertSlice';
import { useEffect } from 'react';
import { navHeight, navHeight2, searchbarHeight } from '~/styles/constants';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: navHeight + searchbarHeight + 32,
    marginBottom: 64,
    [theme.breakpoints.up('md')]: {
      marginTop: navHeight2 + 32,
    },
  },
}));

const Register = () => {
  const dispatch = useAppDispatch();
  const { isAuth, error } = useAppSelector((state) => state.auth);
  const classes = useStyles();

  const onSubmit = (data: SignUpUserDto) => {
    dispatch(signUp(data));
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlert(error, 'error'));
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  const searchParams = new URLSearchParams(useLocation().search);
  const fromUrl = searchParams.get('from') || '/profile/info';

  const methods = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  return isAuth ? (
    <Redirect to={fromUrl} />
  ) : (
    <>
      <FormProvider {...methods}>
        <Container maxWidth="sm" className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography gutterBottom variant="h5" align="center">
              Sign Up
            </Typography>
            <TextInputWithIcon
              name="username"
              label="User Name"
              startIcon={<AccountCircleIcon />}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <TextInputWithIcon
              name="email"
              label="Email"
              startIcon={<MailOutlineIcon />}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <PasswordInput
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <PasswordInput
              name="password2"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <Typography variant="body2" style={{ marginBottom: '1rem' }}>
              Already have an account?
              <Link
                to={fromUrl ? `/auth/login?from=${fromUrl}` : '/auth/login'}
                style={{ marginLeft: '.5rem' }}
              >
                <MuiLink>Log In.</MuiLink>
              </Link>
            </Typography>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
          </form>
          <Typography
            gutterBottom
            variant="body1"
            align="center"
            sx={{ mt: 2 }}
          >
            Or Log in using:
          </Typography>
          {/* <SocialButtons from={fromURL} /> */}
        </Container>
      </FormProvider>
    </>
  );
};

export default Register;

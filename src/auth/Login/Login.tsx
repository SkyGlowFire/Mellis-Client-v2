import { useForm, FormProvider } from 'react-hook-form';
import {
  Button,
  Theme,
  Container,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { makeStyles } from '@mui/styles';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { login, clearAuthError } from '../state/authSlice';
import { useLocation, Redirect, Link } from 'react-router-dom';
import {
  TextInputWithIcon,
  PasswordInput,
} from '~/common/components/react-hook-form-inputs';
import { LoginUserDto } from '~/auth/state/dto/loginUser.dto';
import { FC, useEffect } from 'react';
import { navHeight, navHeight2, searchbarHeight } from '~/styles/constants';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { setAlert } from '~/alerts/alertSlice';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: navHeight + searchbarHeight + 32,
    marginBottom: 64,
    [theme.breakpoints.up('md')]: {
      marginTop: navHeight2 + 32,
    },
  },
}));

const Login: FC = () => {
  const classes = useStyles();
  const searchParams = new URLSearchParams(useLocation().search);
  const fromUrl = searchParams.get('from') || '/profile/info';
  const dispatch = useAppDispatch();
  const { isAuth, error } = useAppSelector((state) => state.auth);

  const onSubmit = (data: LoginUserDto) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      dispatch(setAlert(error, 'error'));
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

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
              Log In
            </Typography>
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
            <Typography
              variant="body2"
              gutterBottom
              style={{ marginBottom: '1rem' }}
            >
              Forgot password?
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '1rem' }}>
              Don't have an account?
              <Link
                to={fromUrl ? `/auth/signup?from=${fromUrl}` : '/auth/signup'}
                style={{ marginLeft: '.5rem' }}
              >
                <MuiLink>Sign Up.</MuiLink>
              </Link>
            </Typography>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Log in
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
        </Container>
      </FormProvider>
    </>
  );
};

export default Login;

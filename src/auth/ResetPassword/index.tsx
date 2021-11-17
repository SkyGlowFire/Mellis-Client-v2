import { FC, useEffect } from 'react';
import { ErrorResponse, useResetPasswordMutation } from '~/app/api';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Container, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { navHeight, navHeight2, searchbarHeight } from '~/styles/constants';
import { useAppDispatch } from '~/app/hooks';
import { setAlert } from '~/alerts/alertSlice';
import PasswordInput from '~/common/components/react-hook-form-inputs/PasswordInput/PasswordInput';
import { useParams } from 'react-router-dom';
import { getUser } from '~/auth/state/authSlice';
import { useHistory } from 'react-router-dom';

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

interface IFormData {
  password: string;
  password2: string;
}

const ResetPassword: FC = () => {
  const [changePassword, { isSuccess, error }] = useResetPasswordMutation();
  const methods = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: { password: '', password2: '' },
  });
  const { handleSubmit } = methods;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();
  const { push } = useHistory();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAlert('Password has been changed', 'success'));
      dispatch(getUser());
      push('/profile/info');
    }
  }, [isSuccess, push, dispatch]);

  useEffect(() => {
    if (error && 'status' in error) {
      const errorData = error.data as ErrorResponse;
      dispatch(setAlert(errorData.message, 'error'));
    }
  }, [error, dispatch]);

  const onSubmit = (data: IFormData) => {
    changePassword({ password: data.password, token });
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm" className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography gutterBottom variant="h5" align="center">
            Reset password
          </Typography>
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
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Apply
          </Button>
        </form>
      </Container>
    </FormProvider>
  );
};

export default ResetPassword;

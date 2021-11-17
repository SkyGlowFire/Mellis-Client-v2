import { FC, useEffect } from 'react';
import { ErrorResponse, useForgotPasswordMutation } from '~/app/api';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Container, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInputWithIcon } from '~/common/components/react-hook-form-inputs';
import { navHeight, navHeight2, searchbarHeight } from '~/styles/constants';
import { useAppDispatch } from '~/app/hooks';
import { setAlert } from '~/alerts/alertSlice';
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

const ForgotPassword: FC = () => {
  const [sendPasswordChangeRequest, { isSuccess, error }] =
    useForgotPasswordMutation();
  const methods = useForm<{ email: string }>({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
  });
  const { handleSubmit } = methods;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  useEffect(() => {
    if (isSuccess) {
      push('/auth/email-sent');
    }
  }, [isSuccess, push]);

  useEffect(() => {
    if (error && 'status' in error) {
      const errorData = error.data as ErrorResponse;
      dispatch(setAlert(errorData.message, 'error'));
    }
  }, [error, dispatch]);

  const onSubmit = (data: { email: string }) => {
    sendPasswordChangeRequest(data);
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm" className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography gutterBottom variant="h5" align="center">
            Reset password
          </Typography>
          <Typography gutterBottom variant="body2" sx={{ mb: 3 }}>
            Enter your email address. We will send you email with instructions
            for password change.
          </Typography>
          <TextInputWithIcon
            name="email"
            label="Email"
            startIcon={<MailOutlineIcon />}
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
            Send Email
          </Button>
        </form>
      </Container>
    </FormProvider>
  );
};

export default ForgotPassword;

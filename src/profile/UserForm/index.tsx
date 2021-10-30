import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button, Grid } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import TextInput from '~/common/components/react-hook-form-inputs/TextInput/TextInput';
import PasswordInput from '~/common/components/react-hook-form-inputs/PasswordInput/PasswordInput';
import { useEffect } from 'react';
import { useUpdateUserMutation } from '~/app/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { setAlert } from '~/alerts/alertSlice';
import { getUser } from '~/auth/state/authSlice';

interface UserFormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
  oldPassword: string;
}

const UserForm = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateUser, { error, isSuccess }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('error: ', error);
    const apiError = error as { data?: { message: string; status: number } };
    if (apiError?.data) {
      dispatch(setAlert(apiError.data.message, 'error'));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getUser());
      dispatch(setAlert('User data has been updated', 'success'));
    }
  }, [isSuccess, dispatch]);

  const methods = useForm<UserFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      password2: '',
      oldPassword: '',
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!user) return;
    reset({
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      password: '',
      password2: '',
      oldPassword: '',
    });
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    const { password2, ...dto } = data;
    if (user) updateUser({ data: dto, id: user._id });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ marginBottom: '2rem' }}
        >
          <Typography gutterBottom variant="h5">
            User info
          </Typography>
          <Grid container spacing={2} sx={{ maxWidth: 400 }}>
            <Grid item xs={12}>
              <TextInput
                fullWidth
                name="username"
                label="User Name"
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                fullWidth
                name="email"
                label="Email"
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                fullWidth
                name="firstName"
                label="First name"
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                fullWidth
                name="lastName"
                label="Last name"
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                fullWidth
                name="oldPassword"
                label="Old password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                fullWidth
                name="password"
                label="New password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                fullWidth
                name="password2"
                label="Confirm password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default UserForm;

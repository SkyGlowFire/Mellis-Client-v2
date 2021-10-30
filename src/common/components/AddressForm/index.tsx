import TextInput from '~/common/components/react-hook-form-inputs/TextInput/TextInput';
import { Grid, Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { schema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { Address } from '~/types/user';

export interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  address?: Address | null;
}

interface AddressFormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  streetName: string;
  streetNumber: string;
  apartment: string;
  zip: string;
}

const AddressForm: FC<AddressFormProps> = ({ onSubmit, address }) => {
  const methods = useForm<AddressFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      streetName: '',
      streetNumber: '',
      apartment: '',
      zip: '',
    },
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!address) return;
    const {
      firstName,
      lastName,
      phone,
      city,
      streetNumber,
      streetName,
      apartment,
      zip,
    } = address;
    reset({
      firstName,
      lastName,
      phone,
      city,
      streetName,
      streetNumber,
      apartment,
      zip: String(zip),
    });
  }, [address, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '1rem' }}>
        <Grid container spacing={2} sx={{ maxWidth: 600 }}>
          <Grid item xs={12}>
            <TextInput name="firstName" fullWidth label="First Name" />
          </Grid>
          <Grid item xs={12}>
            <TextInput name="lastName" fullWidth label="Last Name" />
          </Grid>
          <Grid item xs={12}>
            <TextInput name="phone" fullWidth label="Phone" />
          </Grid>
          <Grid item xs={12}>
            <TextInput name="city" fullWidth label="City" />
          </Grid>
          <Grid item xs={12}>
            <TextInput name="streetName" fullWidth label="Street" />
          </Grid>
          <Grid item xs={12}>
            <TextInput name="streetNumber" fullWidth label="Home" />
          </Grid>
          <Grid item xs={12}>
            <TextInput name="apartment" fullWidth label="Flat" />
          </Grid>
          <Grid item xs={12}>
            <TextInput name="zip" fullWidth label="Postal Code" />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default AddressForm;

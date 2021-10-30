import * as yup from 'yup'

export const schema = yup.object().shape({
  firstName: yup.string()
  .matches(/^([A-Za-zА-Яа-я]{2,})?$/, 'First name can only contain letters and can\'t be less the 2 characters'),
  lastName: yup.string()
  .matches(/^([A-Za-zА-Яа-я]{2,})?$/, 'Last name can only contain letters and can\'t be less the 2 characters'),
  phone: yup.string().notRequired().nullable()
  .matches(/^([\d]{10,})?$/, 'Please enter valid phone number'),
  email: yup.string().required('*This field is required').email('Enter valid email'),
  password: yup.string()
    .nullable()
    .matches(/^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15})?$/, 'Password must contain at least one character and one number, and must be between 8 and 15 characters length'),
  password2: yup.string()
    .when('password', {
      is: (val:string) => val !== '',
      then: yup.string()
      .required('Please confirm password')
      .oneOf([yup.ref('password')], 'Passwords must match')
    }),
  username: yup.string()
    .matches(/^[A-Za-zА-Яа-я ]*$/, 'Username can contain only characters')
    .max(20, 'Username can\'t be more than 20 characters length')
    .min(4, 'Username can\'t be less than 3 characters length')
    .required('Username is required'),
}).required()
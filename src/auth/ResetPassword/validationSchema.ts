import * as yup from 'yup'

export const schema = yup.object().shape({
    password: yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/, 'Password must contain at least one character and one number')
    .max(20, 'Password can\'t be more than 20 characters length')
    .min(8, 'Password can\'t be less than 8 characters length')
    .required('Password is required'),
    password2: yup.string().required('This field is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
  }).required()
import * as yup from 'yup'

export const schema = yup.object().shape({
  firstName: yup.string().required('*This field is required')
  .matches(/^[A-Za-zА-Яа-я]{2,}$/, 'First name can only contain letters and can\'t be less the 2 characters'),
  lastName: yup.string().required('*This field is required')
  .matches(/^[A-Za-zА-Яа-я]{2,}$/, 'Last name can only contain letters and can\'t be less the 2 characters'),
  phone: yup.string().notRequired().nullable()
  .matches(/^(((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d- ]{7,10})?$/, 'Please enter valid phone number'),
  city: yup.string().required('*This field is required')
  .matches(/^[a-zA-Z]{2,}(?:[\s-][a-zA-Z]{2,})*$/, 'Please enter valid city name'),
  streetName: yup.string().required('*This field is required', )
  .matches(/^[A-Za-zА-Яа-я.\s]{3,}$/, 'Please enter valid street name'),
  streetNumber: yup.string().required('*This field is required')
  .matches(/^[\d]+[A-Za-z]?$/, 'Can contain only digits and letters'),
  apartment: yup.string().matches(/^[\d]+([A-Za-z]){0,1}$/, 'Must be a digit'),
  zip: yup.string().required('*This field is required')
  .matches(/^[\d]{6,6}$/, 'Postal code can only contain digits and must be 6 characters long')
}).required()
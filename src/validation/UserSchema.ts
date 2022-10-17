import * as yup from 'yup';

const userSchema = yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    birthDate: yup.date().required('Date of birth is required').min("1969-11-13", "Date is too early").typeError('Invalid format'),
    sex: yup.string().required('Gender is required')
});

export default userSchema;
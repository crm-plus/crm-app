import * as yup from 'yup';

const credentialSchema = yup.object({
    email: yup
        .string()
        .email('Email is invalid')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(14, 'Password must not exceed 14 characters')
});

export default credentialSchema;
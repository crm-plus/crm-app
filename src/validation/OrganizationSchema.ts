import * as yup from 'yup';

const organizationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
    description: yup
        .string()
        .max(16, 'Description must not exceed 16 characters'),
    isPrivate: yup
        .boolean()
});

export default organizationSchema;

import * as yup from 'yup';

const credentialSchema = yup.object({
    email: yup.string().email().defined(),
    password: yup.string().defined()
});

export default credentialSchema;
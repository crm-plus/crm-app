import * as yup from "yup";

const UserRegistrationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    confirmEmail: yup
        .string()
        .required("Confirm email is required"),
    firstName: yup
        .string()
        .required("First name is required"),

})

export default UserRegistrationSchema;
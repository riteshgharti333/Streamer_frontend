import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your username"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password:  Yup.string()
    .required("Please enter your confirm password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

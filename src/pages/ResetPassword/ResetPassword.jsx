import { BsArrowLeft } from "react-icons/bs";
import "./ResetPassword.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetSchema } from "../../schemas";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";

const initialvalues = {
  password: "",
  confirm_password: "",
};

const ResetPassword = () => {
  const { id, token } = useParams();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const baseUrl = import.meta.env.VITE_API_KEY;

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      validationSchema: resetSchema,
      onSubmit: async (values) => {
        try {
          const payload = {
            password: values.password,
          };

          const response = await axios.post(
            `${baseUrl}/auth/reset-password/${id}/${token}`,
            payload
          );

          toast.success(response.data.message);
          navigate("/login");
        } catch (error) {
          console.log(error);
          toast.error(
            error.response?.data?.message ||
              "Something went wrong, please try again."
          );
        }
      },
    });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="resetPassword">
      <div className="logo">
        <h1>Streamer</h1>
      </div>
      <div className="updatePasswordBack">
        <Link to="#" onClick={goBack}>
          <BsArrowLeft className="backArrow" />
        </Link>
      </div>
      <div className="updatePasswordContainer">
        <div className="updatePasswordContainerWrapper bg-primary">
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="formData">
              <label htmlFor="password">Add New Password</label>
              <div className="inputData">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Add New Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {showPassword ? (
                  <BiHide
                    className="inputIcon"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <BiShow
                    className="inputIcon"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>

              {errors.password && touched.password ? (
                <p className="formError">{errors.password}</p>
              ) : null}
            </div>
            <div className="formData">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm New Password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirm_password && touched.confirm_password ? (
                <p className="formError">{errors.confirm_password}</p>
              ) : null}
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

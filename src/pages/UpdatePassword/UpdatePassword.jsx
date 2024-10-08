import { BsArrowLeft } from "react-icons/bs";
import "./UpdatePassword.scss";
import { Link, useNavigate } from "react-router-dom";
import { updatePasswordSchema } from "../../schemas";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatePasswordAsync } from "../../redux/asyncThunks/authThunks";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";

const initialvalues = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      validationSchema: updatePasswordSchema,
      onSubmit: async (values) => {
        try {
          const payload = {
            currentPassword: values.current_password,
            newPassword: values.new_password,
          };

          const response = await dispatch(
            updatePasswordAsync(payload),
          ).unwrap();
          toast.success(response.message);
          navigate("/profile");
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      },
    });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="updatePassword">
      <div className="updatePasswordBack">
        <Link to="#" onClick={goBack}>
          <BsArrowLeft className="backArrow" />
        </Link>
      </div>
      <div className="updatePasswordContainer">
        <div className="updatePasswordContainerWrapper bg-primary">
          <h1>Update Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="formData">
              <label htmlFor="currentPassword">Add Current Password</label>
              <input
                type="password"
                name="current_password"
                placeholder="Add Current Password"
                value={values.current_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.current_password && touched.current_password ? (
                <p className="formError">{errors.current_password}</p>
              ) : null}
            </div>
            <div className="formData">
              <label htmlFor="newPassword">Add New Password</label>
              <div className="inputData">
                <input
                  type={showPassword ? "text" : "password"}
                  name="new_password"
                  placeholder="Add New Password"
                  value={values.new_password}
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

              {errors.new_password && touched.new_password ? (
                <p className="formError">{errors.new_password}</p>
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
            <button type="submit">Change Password</button>
            <p className="forgot">
              {" "}
              <Link to={"/forgot-password"}>Forgot Password</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;

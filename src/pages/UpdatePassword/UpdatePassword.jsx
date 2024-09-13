import { BsArrowLeft } from "react-icons/bs";
import "./UpdatePassword.scss";
import { Link, useNavigate } from "react-router-dom";
import { updatePasswordSchema } from "../../schemas";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatePasswordAsync } from "../../redux/asyncThunks/authThunks";

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

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      validationSchema: updatePasswordSchema,
      onSubmit: async (values) => {
        try {
          const payload = {
            currentPassword: values.current_password,
            newPassword: values.new_password, // Renaming the field for payload
          };

          const response = await dispatch(
            updatePasswordAsync(payload)
          ).unwrap();
          toast.success(response.message);
          navigate("/profile");
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      },
    });

  return (
    <div className="updatePassword">
      <div className="updatePasswordBack">
        <Link to="#" onClick={goBack}>
          <BsArrowLeft className="backArrow" />
        </Link>
      </div>
      <div className="updatePasswordContainer bg-primary">
        <h1>Change Password</h1>
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
            <input
              type="password"
              name="new_password"
              placeholder="Add New Password"
              value={values.new_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;

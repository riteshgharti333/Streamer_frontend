import "./Login.scss";
import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginAsyncUser } from "../../redux/asyncThunks/authThunks";
import { toast } from "react-toastify";

const initialvalues = {
  email: "",
  password: "",
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      onSubmit: async (values) => {
        try {
          const response = await dispatch(loginAsyncUser(values)).unwrap();
          console.log(response);
          if (response && response.message) {
            toast.success(response.message);
            navigate("/");
          }
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
    <div className="login">
      <div className="logo">
        <h1>STREAMER</h1>
      </div>
      <div className="container">
        <form className="input" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="inputValid">
            <div className="inputType">
              <IoMdMail className="inputIcon" />
              <input
                type="email"
                autoComplete="off"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.email && touched.email ? (
              <p className="formError">{errors.email}</p>
            ) : null}
          </div>

          <div className="inputValid">
            <div className="inputType">
              <BiSolidLock className="inputIcon" />
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {showPassword ? (
                <BiHide
                  className="viewIcon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <BiShow
                  className="viewIcon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.password && touched.password ? (
              <p className="formError">{errors.password}</p>
            ) : null}
          </div>

          <button className="loginButton" type="submit">
            Login
          </button>
          <p className="forgot">
            <Link to={"/forgot-password"}>Forgot Passoword</Link>
          </p>

          <span>
            New to Streamer
            <span className="signupLink">
              <Link to="/register"> Sign Up</Link>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}

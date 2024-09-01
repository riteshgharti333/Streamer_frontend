import "./Login.scss";
import { useEffect, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/index";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { loginAsyncUser } from "../../redux/asyncThunks/authThunks";


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
          await dispatch(loginAsyncUser(values));
          navigate("/");
        } catch (error) {
         console.log(error);
        }
      },
    });


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
        <h1><span className="f">STRE</span><span className="s">AMER</span></h1>
        </div>
      </div>
      <div className="container">
        <form className="input"  onSubmit={handleSubmit}>
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

          <button className="loginButton" type="submit">
            Login
          </button>
          <span>
            New to streamer
            <span className="signupLink">
              <Link to="/register"> Sign Up</Link>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}

import "./ForgotPassword.scss";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseUrl = import.meta.env.VITE_API_KEY;

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/forgot-password`, {
        email,
      });
      toast.success(response.data.message, { autoClose: 5000 });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="forgotPassword">
      {!user && (
        <div className="logo">
          <h1>Streamer</h1>
        </div>
      )}

      <div className="updatePasswordBack" style={!user ? { top: "30px" } : {}}>
        <Link to="#" onClick={goBack}>
          <BsArrowLeft className="backArrow" />
        </Link>
      </div>
      <div className="forgotPasswordInfo bg-primary">
        <h2>Forgot Password?</h2>
        <p>
          Enter your email below, and we will send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

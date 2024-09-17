import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import success from "../../assets/animations/success.json";
import "./SuccessPage.scss";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/subscriptions");
    }, 5000); 
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="success">
      <Lottie options={defaultOptions} height={600} width={300} className="successAni" />
    </div>
  );
};

export default SuccessPage;

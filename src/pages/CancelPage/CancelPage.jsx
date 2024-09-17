import "./CancelPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import cancel from "../../assets/animations/cancel.json";
import { useMediaQuery } from "@mui/material";

const CancelPage = () => {
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width: 480px)");
  const isMdScreen = useMediaQuery("(max-width: 768px)");

  let height = isSmallScreen ? 200 : isMdScreen ? 300 : 400;
  let width = isSmallScreen ? 300 : isMdScreen ? 500 : 400;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/subscriptions");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cancel,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="cancel">
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
        className="successAni"
      />
    </div>
  );
};

export default CancelPage;

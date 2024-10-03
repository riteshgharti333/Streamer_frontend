import "./SubscriptionCard.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SubscriptionCard = ({ name, price, image, onClick }) => {
  const style = {
    backgroundImage: `url(${image})`,
  };

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Handle click when user is not logged in
  const handleBuyClick = () => {
    if (!user) {
      toast.error(
        "You are not logged in. Please log in to purchase a subscription.",
      );
      navigate("/login");
    } else {
      onClick();
    }
  };

  return (
    <div className="subscriptionCard">
      <div className="card2" style={style}>
        <div className="subscriptionCardInfo">
          <h1>{name}</h1>
          <p>{price}</p>
          <button className="play-btn" onClick={handleBuyClick}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;

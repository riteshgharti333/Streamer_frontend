import "./Subscriptions.scss";
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import {subscriptionsPlans} from "../../assets/data";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Subscriptions = () => {
  return (
    <div className="subscriptions">
        <Link to="/">
      <BsArrowLeft className="backIcon" />

        </Link>
      <h1>Subscriptions</h1>
      <div className="subscriptionsCards">
        {subscriptionsPlans.map((subscriptionsPlan) => (
          <SubscriptionCard
            name={subscriptionsPlan.name}
            price={subscriptionsPlan.price}
            image={subscriptionsPlan.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;

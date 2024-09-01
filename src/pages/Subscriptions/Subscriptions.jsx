import { useDispatch, useSelector } from 'react-redux'; // Adjust path if necessary
import "./Subscriptions.scss";
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import { subscriptionsPlans } from "../../assets/data";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { createAsyncCustomer, createAsyncSubscriptionSession } from '../../redux/asyncThunks/subscriptionThunks';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscription = async (priceId) => {
    try {

      const subscriptionData = {
        email: user.user.email,
        name: user.user.name,
        priceId,
        userId: user.user._id,
      };
      // First, create a customer
      const customerResult = await dispatch(createAsyncCustomer({ email: user.user.email, paymentMethod: 'pm_card_visa' }));
      if (createAsyncCustomer.fulfilled.match(customerResult)) {
        const customerId = customerResult.payload.id;

        // Create a subscription session
        const sessionResult = await dispatch(createAsyncSubscriptionSession(subscriptionData));
        if (createAsyncSubscriptionSession.fulfilled.match(sessionResult)) {
          // Redirect to Stripe Checkout
          window.location.href = sessionResult.payload;

      
        } else {
          console.error('Failed to create subscription session:', sessionResult.payload);
        }
      } else {
        console.error('Failed to create customer:', customerResult.payload);
      }
  } catch (error) {
      console.error('Error handling subscription:', error);
    }
  };

  return (
    <div className="subscriptions">
      <Link to="/">
        <BsArrowLeft className="backIcon" />
      </Link>
      <h1>Subscriptions</h1>
      <div className="subscriptionsCards">
        {subscriptionsPlans.map((s) => (
          <SubscriptionCard
            key={s.name} // Ensure unique key for list rendering
            name={s.name}
            price={s.price}
            image={s.image}
            onClick={() => {
              setSelectedPlan(s.name); // Store the selected plan name
              handleSubscription(s.priceId);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;

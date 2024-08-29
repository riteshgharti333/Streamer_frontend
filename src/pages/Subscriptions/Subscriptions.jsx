import { useDispatch, useSelector } from 'react-redux'; // Adjust path if necessary
import "./Subscriptions.scss";
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import { subscriptionsPlans } from "../../assets/data";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { createAsyncCustomer, createAsyncSubscriptionSession, saveAsyncsSubscriptionSession } from '../../redux/asyncThunks/subscriptionThunks';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscription = async (priceId) => {
    try {
      const userEmail = user.user.email;
      const userName = user.user.name; 

      // First, create a customer
      const customerResult = await dispatch(createAsyncCustomer({ email: userEmail, paymentMethod: 'pm_card_visa' }));
      if (createAsyncCustomer.fulfilled.match(customerResult)) {
        const customerId = customerResult.payload.id;

        // Create a subscription session
        const sessionResult = await dispatch(createAsyncSubscriptionSession({ email: userEmail, priceId }));
        if (createAsyncSubscriptionSession.fulfilled.match(sessionResult)) {
          // Redirect to Stripe Checkout
          window.location.href = sessionResult.payload;

          // Save subscription details in the database
          const subscriptionData = {
            userId: user.user._id, // Assuming user ID is available
            customerId,
            subscriptionId: sessionResult.payload.subscriptionId, // Adjust as necessary
            plan: selectedPlan, // Use the selected plan data
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // Adjust end date if needed
            status: 'active',
            price: subscriptionsPlans.find(p => p.priceId === priceId).price, // Use price from subscriptionsPlans
            email: userEmail, // Add email
            name: userName // Add name
          };

          console.log(subscriptionData);
          await dispatch(saveAsyncsSubscriptionSession(subscriptionData));
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

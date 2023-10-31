import './Subscriptions.scss'
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";

const Subscriptions = () => {
  return (
    <div className='subscriptions'>
      <h1>Subscriptions</h1>
      <div className="subscriptionsCards">
      <SubscriptionCard />
      <SubscriptionCard />
      <SubscriptionCard />
      </div>
     

    </div>
  )
}

export default Subscriptions

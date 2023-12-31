import './SubscriptionCard.scss';

const SubscriptionCard = ({ name, price, image }) => {
  const style = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className='subscriptionCard'>
      <div className="card2" style={style}>
        <div className="subscriptionCardInfo">
          <h1>{name}</h1>
          <p>{price}</p>
          <button>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;

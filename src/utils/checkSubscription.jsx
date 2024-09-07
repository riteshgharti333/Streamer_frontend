// utils/checkSubscription.js
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useCheckSubscription = () => {
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth.user); 


  const checkAndRedirect = () => {
    if (!user || !user.subscription || user.subscription.length === 0) {
      navigate('/subscriptions');
    }
  };

  return checkAndRedirect;
};

import { useSelector } from 'react-redux';

export const useCheckSubscription = () => {
  const { user } = useSelector((state) => state.auth);

  const checkSubscription = () => {
    if (!user || !user.subscription || user.subscription.length === 0) {
      return false;
    }
    return true;
  };

  return checkSubscription;
};

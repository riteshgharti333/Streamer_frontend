import { useSelector } from "react-redux";

export const useCheckSubscription = () => {
  const user = useSelector((state) => state.auth.user);

  const checkSubscription = () => {
    if (!user || !user.subscriptions || user.subscriptions.length === 0) {
      return false;
    }
  };

  return checkSubscription;
};

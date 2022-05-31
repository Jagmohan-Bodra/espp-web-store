import subscriptionApi from '../apis/api/subscription';

export const createSubscriptionService = (data) => {
  return subscriptionApi.createSubscription(data);
};

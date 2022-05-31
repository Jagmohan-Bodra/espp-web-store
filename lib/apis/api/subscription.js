import {authClient} from '../apiClient.js';

const createSubscription = (data) => {
  return authClient.post('/v1/subscription', data);
};

export default {
  createSubscription,
};

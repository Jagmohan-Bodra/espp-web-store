import {authClient} from '../apiClient.js';

const createInbox = (data) => {
  return authClient.post('/v1/crm/inbox', data);
};

export default {
  createInbox,
};

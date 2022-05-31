import {authClient} from '../apiClient.js';

const postEnquiries = (data, recaptra) => {
  return authClient.post('/v1/enquiries', data, {recaptra});
};

export default {
  postEnquiries,
};

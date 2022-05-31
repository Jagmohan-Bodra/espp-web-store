import {authClient} from '../apiClient.js';

const postApprovalRequestCreate = async (data) => {
  return await authClient.post('/v1/approval-request/create', data);
};

export default {
  postApprovalRequestCreate,
};

import approvalApi from '../apis/api/approvalRequest';

export const postApprovalRequestCreate = async (data) => {
  return await approvalApi.postApprovalRequestCreate(data).then((data) => data);
};

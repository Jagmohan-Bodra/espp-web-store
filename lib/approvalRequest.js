import {postApprovalRequestCreate} from './services/approvalRequest';

export async function approvalRequestCreate(data) {
  return await postApprovalRequestCreate(data);
}

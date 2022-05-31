import enquiryApi from '../apis/api/enquiry';

export const postEnquiry = (data, recaptra) => {
  return enquiryApi.postEnquiries(data, recaptra);
};

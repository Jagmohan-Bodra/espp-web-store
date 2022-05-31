import customerApi from '../apis/api/customer';

export const postCustomer = (data, recaptra) => {
  return customerApi.postCustomer(data, recaptra).then((data) => data);
};

export const updateCustomerService = (id, data) => {
  return customerApi.putCustomer(id, data).then((data) => data);
};

export const postCustomerAddressCreate = (data) => {
  return customerApi.postCustomerAddressCreate(data).then((data) => data);
};

export const putCustomerAddressUpdate = (id, data) => {
  return customerApi.putCustomerAddressUpdate(id, data).then((data) => data);
};

export const deleteCustomerAddress = (id) => {
  return customerApi.deleteCustomerAddress(id).then((data) => data);
};

import {authClient} from '../apiClient.js';

const postCustomer = (data, recaptra) => {
  return authClient.post('/v1/customer-sign-up', data, {recaptra});
};

const putCustomer = (id, data) => {
  return authClient.put('/v1/customers/' + id, data);
};

const postCustomerAddressCreate = (data) => {
  return authClient.post('/v1/customer-addresses', data);
};

const putCustomerAddressUpdate = (id, data) => {
  return authClient.put('/v1/customer-addresses/' + id, data);
};

const deleteCustomerAddress = (id, data) => {
  return authClient.delete('/v1/customer-addresses/' + id, data);
};

export default {
  postCustomer,
  putCustomer,
  postCustomerAddressCreate,
  putCustomerAddressUpdate,
  deleteCustomerAddress,
};

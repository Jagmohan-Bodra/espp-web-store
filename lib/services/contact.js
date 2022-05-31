import apis from '../apis/api/contact';

export const sendContact = (data) => {
  return apis
    .createInbox(data)
    .then((data) => data.data)
    .catch((error) => error);
};

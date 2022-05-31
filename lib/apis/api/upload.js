import {authClient} from '../apiClient.js';

const uploadImage = (data) => {
  return authClient.postUploadFile('/v1/drive/upload', data);
};

export default {
  uploadImage,
};

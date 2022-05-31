import uploadApi from '~/lib/apis/api/upload';

export const uploadImageService = (imageFile) => {
  return uploadApi
    .uploadImage(imageFile)
    .then((response) => ((response.data || [])[0] || {}).fileOriginPath)
    .catch(() => false);
};

export default uploadImageService;

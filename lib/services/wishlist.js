import wishlistApi from '../apis/api/wishlist';

export const getWishlistList = (query) => {
  return wishlistApi.getWishlistList(query).then((data) => data.data);
};

export const getWishlistDetail = (id) => {
  return wishlistApi.getWishlistDetail(id).then((data) => data.data);
};

export const createWishlist = (data) => {
  return wishlistApi.postWishlistCreate(data);
};

export const deleteWishlist = (id) => {
  return wishlistApi.postWishlistDelete(id);
};

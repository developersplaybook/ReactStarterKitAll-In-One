import * as apiClient from "../helpers/ApiHelpers";

export const getPhotosFromServerAsync = async (albumId, token) => {
  try {
    const response = await apiClient.getHelper('/api/photos/album/' + albumId, token);
    return { data: response };
  } catch (error) {
    throw console.error(error);
  }
}

export const deletePhotoOnServerAsync = async (photoId, token) => {
  try {
    const response = await apiClient.deleteHelper('/api/photos/delete/' + photoId, token);
    return { data: response };
  } catch (error) {
    throw console.error(error);
  }
}

export const updatePhotoCaptionOnServerAsync = async (photoId, caption, token) => {
  try {
    const response = await apiClient.putHelper('/api/photos/update/' + photoId, caption, token);
    return { data: response };
  } catch (error) {
    throw console.error(error);
  }
}

export const getAlbumById = async (albumId) => {
  const response = await apiClient.getHelper('/api/albums/' + albumId);
  return { data: response };
}

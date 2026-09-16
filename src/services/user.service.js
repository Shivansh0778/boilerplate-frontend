import API from './api';

export const getUserStats = async () => {
  const response = await API.get('/users/stats');
  return response.data;
};

export const getUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await API.put(`/users/${userId}`, userData);
  return response.data;
};

export const updateUserStatus = async (userId, isActive) => {
  const response = await API.patch(`/users/${userId}/status`, { isActive });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await API.delete(`/users/${userId}`);
  return response.data;
};
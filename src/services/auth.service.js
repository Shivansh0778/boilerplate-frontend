import API from './api';

export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await API.post('/auth/signup', userData);
  return response.data;
};

export const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await API.post('/auth/forgot-password', { email });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await API.post('/auth/verify-otp', { email, otp });
  return response.data;
};

export const resetPassword = async (email, newPassword, confirmPassword) => {
  const response = await API.post('/auth/reset-password', {
    email,
    newPassword,
    confirmPassword,
  });
  return response.data;
};
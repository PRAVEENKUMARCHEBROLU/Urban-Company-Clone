import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// 🔐 Auth APIs
export const register = (data) => axios.post(`${BASE_URL}/auth/register`, data);
export const login = (data) => axios.post(`${BASE_URL}/auth/login`, data);

//admin APIs
export const getAllUsers = (token) =>
  axios.get(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  

// 👤 User APIs
export const getUserProfile = (token) =>
  axios.get(`${BASE_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUserProfile = (data, token) =>
  axios.put(`${BASE_URL}/user/profile`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUser = (token) =>
  axios.delete(`${BASE_URL}/user/delete`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// 🧑‍🔧 Provider APIs
export const registerAsProvider = (data, token) =>
  axios.post(`${BASE_URL}/provider/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyProviderProfile = (token) =>
  axios.get(`${BASE_URL}/provider/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllProviders = (token) =>
  axios.get(`${BASE_URL}/provider/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
// 🛠 Services APIs
export const createService = (data, token) =>
  axios.post(`${BASE_URL}/services`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllServices = () =>
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/service/`);

export const getServiceById = (id) => 
  axios.get(`${BASE_URL}/service/${id}`);

export const updateService = (id, data, token) =>
  axios.put(`${BASE_URL}/service/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteService = (id, token) =>
  axios.delete(`${BASE_URL}/service/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// 📅 Booking APIs
export const createBooking = (data, token) =>
  axios.post(`${BASE_URL}/booking/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // src/api/auth.jsx


export const updateBookingStatus = (id, status, token) => {
  return axios.put(`${BASE_URL}/booking/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};



export const getUserBookings = (token) =>
  axios.get(`${BASE_URL}/booking/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProviderBookings = (token) =>
  axios.get(`${BASE_URL}/booking/provider`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllBookings = (token) =>
  axios.get(`${BASE_URL}/booking/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

//  // history APIs 
// export const getBookingHistory = (token) =>
//   axios.get(`${BASE_URL}/booking/history`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// 🌟 Review APIs
export const createReview = (data, token) =>
  axios.post(`${BASE_URL}/reviews`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProviderReviews = (id) =>
  axios.get(`${BASE_URL}/reviews/provider/${id}`);

export const getServiceReviews = (id) =>
  axios.get(`${BASE_URL}/reviews/service/${id}`);

// 💳 Payment APIs (Razorpay)
export const createOrder = (data, token) =>
  axios.post(`${BASE_URL}/payments/order`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const verifyPayment = (data, token) =>
  axios.post(`${BASE_URL}/payments/verify`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

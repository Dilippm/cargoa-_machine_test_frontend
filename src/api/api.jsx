import axios from 'axios';

const API_URL = 'http://localhost:3000';

//api for login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// api for register
export const registerUser = (userData) => {
    return axios.post(`${API_URL}/api/auth/register`, userData);
  };
  //api call to get vendors
  export const getVendors = () => {
    return axios.get(`${API_URL}/api/auth/vendor`);
  };

  // api to submit purchase order

  export const submitPurchaseOrder = (formData, pdfFile, token) => {
    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(formData));
    formDataToSend.append("pdfFile", pdfFile);
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
  
    return axios.post(`${API_URL}/api/products/upload`, formDataToSend, { headers });
  };

  //fetch vendor products
  export const fetchVendorProducts = (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    return axios.get(`${API_URL}/api/products/vendor-products`, { headers });
  };

  //api to update date

  export const updateProductDateApi = (productId, selectedDate) => {
    return axios.post(`${API_URL}/api/products/update-scheduled-date`, {
      productId,
      selectedDate,
    });
  };

  //api for product detials
  export const fetchProductDetailsApi = (token) => {
    return axios.get(`${API_URL}/api/products/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
 
  
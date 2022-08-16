import axios from "axios";
import queryString from "query-string";

const baseURL = process.env.REACT_APP_URL_API;


const getToken = () => {
  const store = JSON.parse(localStorage.getItem("persist:store"));
  const token = JSON.parse(store?.auth)?.user?.access_token;
  if (!token) return null;
  return token;
};

const axiosClient = axios.create({
  baseURL: baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const customConfig = {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  return customConfig;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;

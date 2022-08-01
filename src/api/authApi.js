import axiosClient from "./axiosClient";

const authApi = {
  login: (params) => axiosClient.post('auth/login', params)
}

export default authApi
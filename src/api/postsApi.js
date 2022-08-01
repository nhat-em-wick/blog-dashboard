import axiosClient from "./axiosClient";

const postsApi = {
  create: (params) => axiosClient.post('posts', params),
  getAll: (params) => axiosClient.get('posts', {params}),
  getBySlug: (slug) => axiosClient.get(`posts/${slug}`),
  edit: (slug, params) => axiosClient.put(`posts/${slug}`, params),
  delete: (slug) => axiosClient.delete(`posts/${slug}`)
}

export default postsApi
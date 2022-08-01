import axiosClient from "./axiosClient";

const categoriesApi = {
  create: (params) => axiosClient.post('categories', params),
  getAll: (params) => axiosClient.get('categories', {params}),
  getBySlug: (slug) => axiosClient.get(`categories/${slug}`),
  edit: (slug, params) => axiosClient.put(`categories/${slug}`, params),
  delete: (slug) => axiosClient.delete(`categories/${slug}`)
}

export default categoriesApi
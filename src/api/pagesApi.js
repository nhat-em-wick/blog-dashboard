import axiosClient from "./axiosClient";

const pagesApi = {
  getAll: (params) => axiosClient.get('pages', {params}),
  create: (params) => axiosClient.post('pages', params),
  getBySlug: (slug) => axiosClient.get(`pages/${slug}`),
  edit: (slug, params) => axiosClient.put(`pages/${slug}`, params),
  delete: (slug) => axiosClient.delete(`pages/${slug}`)
}

export default pagesApi
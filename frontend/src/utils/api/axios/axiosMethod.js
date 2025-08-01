import axios from './axiosInstance';
import responseFilter from './responseFilter';

export const getRequest = (URL, config) =>
  axios.get(`/${URL}`, config).then((response) => responseFilter(response));

export const postRequest = (URL, payload, config) =>
  axios
    .post(`/${URL}`, payload, config)
    .then((response) => responseFilter(response));

export const putRequest = (URL, payload, config) =>
  axios
    .put(`/${URL}`, payload, config)
    .then((response) => responseFilter(response));

export const deleteRequest = (URL, config) =>
  axios.delete(`/${URL}`, config).then((response) => responseFilter(response));

export const patchRequest = (URL, payload, config) =>
  axios
    .patch(`/${URL}`, payload, config)
    .then((response) => responseFilter(response));
export default {};

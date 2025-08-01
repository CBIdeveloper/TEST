import Router from './router';
import { postRequest } from '../../axios/axiosMethod';
import { multipartFormData } from '../../ApiHeader';
const getNonCount = (formData) => {
  return postRequest(Router.getNonCount, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response.data);
};

const getSendTime = (formData) => {
  return postRequest(Router.getSendTime, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response.data);
};

const getCount = (formData) => {
  return postRequest(Router.getCount, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response.data);
};

const getNonCount2 = (formData) => {
  return postRequest(Router.getNonCount2, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response.data);
};

const getNonReason = (formData) => {
  return postRequest(Router.getNonReason, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response.data);
};

export default {
  getNonCount,
  getSendTime,
  getCount,
  getNonCount2,
  getNonReason,
};

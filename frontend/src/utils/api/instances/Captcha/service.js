import Router from './router';

import { getRequest } from '../../axios/axiosMethod';

const getCaptchaImage = () =>
  getRequest(Router.getCaptchaImage, {
    withCredentials: true,
    responseType: 'blob',
  }).then((response) => response);

export default {
  getCaptchaImage,
};

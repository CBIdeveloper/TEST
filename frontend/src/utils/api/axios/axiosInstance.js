import axios from 'axios';
import { baseURL } from '../ApiConfig';
import {
  getAccessToken,
  removeTokens,
  accessTokenExpireCheck,
} from '../../auth/auth';

import ApiService from '../ApiService';
import ModalHelper from '../../helper/ModalHelper';
import StatusCodeHelper from '../../helper/StatusCodeHelper';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    if (accessTokenExpireCheck()) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = getAccessToken();
      return newConfig;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response.data);
    const { code } = error.response.data;
    let responseMessage = error.response.data.message;
    let callback = () => {};
    console.log("error.response.status",error.response.status)
    if (error.response.status === 401) {
      // TODO: refresh token...?
      callback = () => {
        ApiService.authentication.signOut().then((response) => {
          if (response.executed) {
            removeTokens();
            window.open('/frontend/login', '_self');
          }
        });
      };
    }
    if (error.response.status === 403 && code === '40010') {
      // TODO: refresh token...?
      callback = () => {
        ApiService.authentication.signOut().then((response) => {
          if (response.executed) {
            removeTokens();
            window.open('/frontend/login', '_self');
          }
        });
      };
    }
    if (code === '40003') {
      responseMessage = error.response.data.login_error_count;
    }
    const message = StatusCodeHelper.getMessage({
      code,
      status: error.response.status,
      entityType: error.response.data.entity_type,
      responseMessage,
    });
    ModalHelper.openMessageModal({
      message,
      callback,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;

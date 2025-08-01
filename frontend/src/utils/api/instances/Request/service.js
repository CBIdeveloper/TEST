import Router from './router';
import { getRequest } from '../../axios/axiosMethod';
const getRequestList = (id) =>
  getRequest(Router.getRequestList(id)).then((response) => response.data);
export default {
  getRequestList,
};

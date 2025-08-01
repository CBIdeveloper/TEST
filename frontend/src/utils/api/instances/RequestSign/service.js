import Router from './router';
import { getRequest } from '../../axios/axiosMethod';
const getRequestSignList = (id) =>
  getRequest(Router.getRequestSignList(id)).then((response) => response.data);
export default {
  getRequestSignList,
};

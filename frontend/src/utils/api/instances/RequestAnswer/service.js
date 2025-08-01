import Router from './router';
import { getRequest } from '../../axios/axiosMethod';
const getRequestAnswerList = (id) =>
  getRequest(Router.getRequestAnswerList(id)).then((response) => response.data);
export default {
  getRequestAnswerList,
};

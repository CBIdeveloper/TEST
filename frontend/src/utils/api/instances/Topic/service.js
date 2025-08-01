import Router from './router';
import { getRequest } from '../../axios/axiosMethod';
const getTopicList = (id) =>
  getRequest(Router.getTopicList(id)).then((response) => response.data);
export default {
  getTopicList,
};

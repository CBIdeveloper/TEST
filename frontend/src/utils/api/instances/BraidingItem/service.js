import Router from './router';
import {
  getRequest,
} from '../../axios/axiosMethod';
import BraidingItemResponse from '../../../dataModels/BraidingItem/BraidingItemResponse';
const getBraidingItemList = (id) =>
  getRequest(Router.getBraidingItemList(id)).then(
    (response) => new BraidingItemResponse(response.data),
  );
  export default {
    getBraidingItemList
  }

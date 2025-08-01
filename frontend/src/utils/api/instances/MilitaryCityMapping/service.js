import Router from './router';
import {
  getRequest,
} from '../../axios/axiosMethod';
// import MilitaryCityMappingResponse from '../../../dataModels/MilitaryCityMapping/MilitaryCityMappingResponse'
const getMilitaryCityMappingList = (id) =>
  getRequest(Router.getMilitaryCityMappingList(id)).then(
    (response) => response,
  );
  export default {
    getMilitaryCityMappingList
  }
  
import Router from './router';
import { getRequest } from '../../axios/axiosMethod';
import BraidingCategoryPlanListResponse from '../../../dataModels/BraidingCategoryPlan/BraidingCategoryPlanListResponse'
const getBraidingCategoryPlanList = () =>
  getRequest(Router.getBraidingCategoryPlanList).then(
    (response) => new BraidingCategoryPlanListResponse(response.data),
  );

export default {
  getBraidingCategoryPlanList,
};

import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import MobilizationPlanQuery from '../../graphql/MobilizationPlan/MobilizationPlanQuery';
import MobilizationPlanResponse from '../../../dataModels/MobilizationPlan/MobilizationPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import MobilizationPlanListResponse from '../../../dataModels/MobilizationPlan/MobilizationPlanListResponse';

const readMobilizationPlan = () =>
  apolloInstance
    .query({
      query: MobilizationPlanQuery.getMobilizationPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      console.log('A', response);
      return data.mobilizationPlans.items.map(
        (item) => new MobilizationPlanResponse(item),
      );
    });

const readMobilizationPlanById = (id) =>
  apolloInstance
    .query({
      query: MobilizationPlanQuery.getMobilizationPlanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new MobilizationPlanResponse(data.mobilizationPlans.items[0]);
    });

const readMobilizationPlanByIdList = (list) =>
  apolloInstance
    .query({
      query: MobilizationPlanQuery.getMobilizationPlanByIdList(list),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.mobilizationPlans.items.map(
        (item) => new MobilizationPlanResponse(item),
      );
    });

const readMobilizationPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: MobilizationPlanQuery.getMobilizationPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.mobilizationPlans.items.map(
        (item) => new MobilizationPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.mobilizationPlans,
        items,
      });
    });

const readMobilizationPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: MobilizationPlanQuery.getMobilizationPlanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.mobilizationPlans.items.map(
        (item) => new MobilizationPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.mobilizationPlans,
        items,
      });
    });

const createMobilizationPlan = (body) =>
  postRequest(Router.createMobilizationPlan, body).then((response) => response);

const updateMobilizationPlan = (id, body) =>
  putRequest(Router.updateMobilizationPlan(id), body).then(
    (response) => response,
  );

const deleteMobilizationPlan = (id) =>
  deleteRequest(Router.updateMobilizationPlan(id)).then((response) => response);

const getMobilizationPlanList = () =>
  getRequest(Router.getMobilizationPlanList).then(
    (response) => new MobilizationPlanListResponse(response.data),
  );

export default {
  readMobilizationPlan,
  readMobilizationPlanById,
  readMobilizationPlanByIdList,

  readMobilizationPlanPagination,
  readMobilizationPlanQueryPagination,

  createMobilizationPlan,
  updateMobilizationPlan,
  deleteMobilizationPlan,
  getMobilizationPlanList,
};

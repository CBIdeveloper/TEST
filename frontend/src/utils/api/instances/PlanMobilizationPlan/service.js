import Router from './router';
import store from '../../../../store/store';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import PlanMobilizationPlanQuery from '../../graphql/PlanMobilizationPlan/PlanMobilizationPlanQuery';
import PlanMobilizationPlanResponse from '../../../dataModels/PlanMobilizationPlan/PlanMobilizationPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

import FileHelper from '../../../helper/FileHelper';
import ModalHelper from '../../../helper/ModalHelper';
import { multipartFormData } from '../../ApiHeader';
import { setLoading } from '../../../../store/loading/slice';

const readPlanMobilizationPlan = () =>
  apolloInstance
    .query({
      query: PlanMobilizationPlanQuery.getMobilizationPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationPlans.items.map(
        (item) => new PlanMobilizationPlanResponse(item),
      );
    });

const readPlanMobilizationPlanById = (id) =>
  apolloInstance
    .query({
      query: PlanMobilizationPlanQuery.getMobilizationPlanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new PlanMobilizationPlanResponse(
        data.planMobilizationPlans.items[0],
      );
    });

const readPlanMobilizationPlanByPlanId = (id) =>
  apolloInstance
    .query({
      query: PlanMobilizationPlanQuery.getMobilizationPlanByPlanId(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationPlans.items.map(
        (item) => new PlanMobilizationPlanResponse(item),
      );
    });

const readPlanMobilizationPlanForMemo = (date) =>
  apolloInstance
    .query({
      query: PlanMobilizationPlanQuery.getMobilizationPlanForMemo(date),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationPlans.items.map(
        (item) => new PlanMobilizationPlanResponse(item),
      );
    });

const readPlanMobilizationPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: PlanMobilizationPlanQuery.getMobilizationPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationPlans.items.map(
        (item) => new PlanMobilizationPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationPlans,
        items,
      });
    });

const readPlanMobilizationPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: PlanMobilizationPlanQuery.getMobilizationPlanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationPlans.items.map(
        (item) => new PlanMobilizationPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationPlans,
        items,
      });
    });

const readPlanMobilizationPlanByPlanIdPagination = ({ id, take, skip }) =>
  apolloInstance
    .query({
      query: PlanMobilizationPlanQuery.getMobilizationPlanByPlanIdPagination({
        id,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationPlans.items.map(
        (item) => new PlanMobilizationPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationPlans,
        items,
      });
    });

const createPlanMobilizationPlan = (body) =>
  postRequest(Router.createMobilizationPlan, body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updatePlanMobilizationPlan = (id, body) =>
  putRequest(Router.updateMobilizationPlan(id), body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updatePlanMobilizationPlanWithoutFile = (id, body) =>
  putRequest(Router.updateMobilizationPlanWithoutFile(id), body).then(
    (response) => response,
  );

const deletePlanMobilizationPlan = (id) =>
  deleteRequest(Router.deleteMobilizationPlan(id)).then((response) => response);

const downloadMobilizationPlan = (id) =>
  getRequest(Router.downloadMobilizationPlan(id), {
    responseType: 'blob',
  })
    .then((response) => FileHelper.openBlobInTab(response))
    .catch(() => {
      store.dispatch(setLoading(false));
      ModalHelper.openErrorModal({
        message: '開啟檔案發生問題！',
      });
    });

const mobilizationPlanFileLink = (id) => Router.mobilizationPlanFileLink(id);

export default {
  readPlanMobilizationPlan,
  readPlanMobilizationPlanById,
  readPlanMobilizationPlanByPlanId,
  readPlanMobilizationPlanForMemo,

  readPlanMobilizationPlanPagination,
  readPlanMobilizationPlanQueryPagination,
  readPlanMobilizationPlanByPlanIdPagination,

  createPlanMobilizationPlan,
  updatePlanMobilizationPlan,
  updatePlanMobilizationPlanWithoutFile,
  deletePlanMobilizationPlan,
  downloadMobilizationPlan,

  mobilizationPlanFileLink,
};

import Router from './router';
import store from '../../../../store/store';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import PlanMobilizationExecutionQuery from '../../graphql/PlanMobilizationExecution/PlanMobilizationExecutionQuery';
import PlanMobilizationExecutionResponse from '../../../dataModels/PlanMobilizationExecution/PlanMobilizationExecutionResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

import FileHelper from '../../../helper/FileHelper';
import ModalHelper from '../../../helper/ModalHelper';
import { multipartFormData } from '../../ApiHeader';
import { setLoading } from '../../../../store/loading/slice';

const readPlanMobilizationExecution = () =>
  apolloInstance
    .query({
      query: PlanMobilizationExecutionQuery.getMobilizationExecution,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationExecutions.items.map(
        (item) => new PlanMobilizationExecutionResponse(item),
      );
    });

const readPlanMobilizationExecutionById = (id) =>
  apolloInstance
    .query({
      query: PlanMobilizationExecutionQuery.getMobilizationExecutionById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new PlanMobilizationExecutionResponse(
        data.planMobilizationExecutions.items[0],
      );
    });

const readPlanMobilizationExecutionForMemo = (date) =>
  apolloInstance
    .query({
      query:
        PlanMobilizationExecutionQuery.getMobilizationExecutionForMemo(date),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationExecutions.items.map(
        (item) => new PlanMobilizationExecutionResponse(item),
      );
    });

const readPlanMobilizationExecutionPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: PlanMobilizationExecutionQuery.getMobilizationExecutionPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationExecutions.items.map(
        (item) => new PlanMobilizationExecutionResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationExecutions,
        items,
      });
    });

const readPlanMobilizationExecutionQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        PlanMobilizationExecutionQuery.getMobilizationExecutionQueryPagination({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationExecutions.items.map(
        (item) => new PlanMobilizationExecutionResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationExecutions,
        items,
      });
    });

const createPlanMobilizationExecution = (body) =>
  postRequest(Router.createMobilizationExecution, body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updatePlanMobilizationExecution = (id, body) =>
  putRequest(Router.updateMobilizationExecution(id), body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updatePlanMobilizationExecutionWithoutFile = (id, body) =>
  putRequest(Router.updateMobilizationExecutionWithoutFile(id), body).then(
    (response) => response,
  );

const deletePlanMobilizationExecution = (id) =>
  deleteRequest(Router.deleteMobilizationExecution(id)).then(
    (response) => response,
  );

const downloadMobilizationExecution = (id) =>
  getRequest(Router.downloadMobilizationExecution(id), {
    responseType: 'blob',
  })
    .then((response) => FileHelper.openBlobInTab(response))
    .catch(() => {
      store.dispatch(setLoading(false));
      ModalHelper.openErrorModal({
        message: '開啟檔案發生問題！',
      });
    });

const mobilizationExecutionFileLink = (id) =>
  Router.mobilizationExecutionFileLink(id);

export default {
  readPlanMobilizationExecution,
  readPlanMobilizationExecutionById,
  readPlanMobilizationExecutionForMemo,

  readPlanMobilizationExecutionPagination,
  readPlanMobilizationExecutionQueryPagination,

  createPlanMobilizationExecution,
  updatePlanMobilizationExecution,
  updatePlanMobilizationExecutionWithoutFile,
  deletePlanMobilizationExecution,
  downloadMobilizationExecution,

  mobilizationExecutionFileLink,
};

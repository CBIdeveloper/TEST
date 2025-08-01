import Router from './router';
import store from '../../../../store/store';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import PlanMobilizationProgramQuery from '../../graphql/PlanMobilizationProgram/PlanMobilizationProgramQuery';
import PlanMobilizationProgramResponse from '../../../dataModels/PlanMobilizationProgram/PlanMobilizationProgramResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

import FileHelper from '../../../helper/FileHelper';
import ModalHelper from '../../../helper/ModalHelper';
import { multipartFormData } from '../../ApiHeader';
import { setLoading } from '../../../../store/loading/slice';

const readPlanMobilizationProgram = () =>
  apolloInstance
    .query({
      query: PlanMobilizationProgramQuery.getMobilizationProgram,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationPrograms.items.map(
        (item) => new PlanMobilizationProgramResponse(item),
      );
    });

const readPlanMobilizationProgramById = (id) =>
  apolloInstance
    .query({
      query: PlanMobilizationProgramQuery.getMobilizationProgramById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new PlanMobilizationProgramResponse(
        data.planMobilizationPrograms.items[0],
      );
    });

const readPlanMobilizationProgramForMemo = (date) =>
  apolloInstance
    .query({
      query: PlanMobilizationProgramQuery.getMobilizationProgramForMemo(date),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationPrograms.items.map(
        (item) => new PlanMobilizationProgramResponse(item),
      );
    });

const readPlanMobilizationProgramPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: PlanMobilizationProgramQuery.getMobilizationProgramPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationPrograms.items.map(
        (item) => new PlanMobilizationProgramResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationPrograms,
        items,
      });
    });

const readPlanMobilizationProgramQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: PlanMobilizationProgramQuery.getMobilizationProgramQueryPagination(
        {
          query,
          take,
          skip,
        },
      ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationPrograms.items.map(
        (item) => new PlanMobilizationProgramResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationPrograms,
        items,
      });
    });

const createPlanMobilizationProgram = (body) =>
  postRequest(Router.createMobilizationProgram, body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updatePlanMobilizationProgram = (id, body) =>
  putRequest(Router.updateMobilizationProgram(id), body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updatePlanMobilizationProgramWithoutFile = (id, body) =>
  putRequest(Router.updateMobilizationProgramWithoutFile(id), body).then(
    (response) => response,
  );

const deletePlanMobilizationProgram = (id) =>
  deleteRequest(Router.deleteMobilizationProgram(id)).then(
    (response) => response,
  );

const downloadMobilizationProgram = (id) =>
  getRequest(Router.downloadMobilizationProgram(id), {
    responseType: 'blob',
  })
    .then((response) => FileHelper.openBlobInTab(response))
    .catch(() => {
      store.dispatch(setLoading(false));
      ModalHelper.openErrorModal({
        message: '開啟檔案發生問題！',
      });
    });

const mobilizationProgramFileLink = (id) =>
  Router.mobilizationProgramFileLink(id);

export default {
  readPlanMobilizationProgram,
  readPlanMobilizationProgramById,
  readPlanMobilizationProgramForMemo,

  readPlanMobilizationProgramPagination,
  readPlanMobilizationProgramQueryPagination,

  createPlanMobilizationProgram,
  updatePlanMobilizationProgram,
  updatePlanMobilizationProgramWithoutFile,
  deletePlanMobilizationProgram,
  downloadMobilizationProgram,

  mobilizationProgramFileLink,
};

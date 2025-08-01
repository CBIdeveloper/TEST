import Router from './router';
import store from '../../../../store/store';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import PlanMobilizationClassificationQuery from '../../graphql/PlanMobilizationClassification/PlanMobilizationClassificationQuery';
import PlanMobilizationClassificationResponse from '../../../dataModels/PlanMobilizationClassification/PlanMobilizationClassificationResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

import FileHelper from '../../../helper/FileHelper';
import ModalHelper from '../../../helper/ModalHelper';
import { multipartFormData } from '../../ApiHeader';
import { setLoading } from '../../../../store/loading/slice';

const readPlanMobilizationClassification = () =>
  apolloInstance
    .query({
      query: PlanMobilizationClassificationQuery.getMobilizationClassification,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationClassifications.items.map(
        (item) => new PlanMobilizationClassificationResponse(item),
      );
    });

const readPlanMobilizationClassificationById = (id) =>
  apolloInstance
    .query({
      query:
        PlanMobilizationClassificationQuery.getMobilizationClassificationById(
          id,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new PlanMobilizationClassificationResponse(
        data.planMobilizationClassifications.items[0],
      );
    });

const readPlanMobilizationClassificationByPlanId = (id) =>
  apolloInstance
    .query({
      query:
        PlanMobilizationClassificationQuery.getMobilizationClassificationByPlanId(
          id,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationClassifications.items.map(
        (item) => new PlanMobilizationClassificationResponse(item),
      );
    });

const readPlanMobilizationClassificationForMemo = (id) =>
  apolloInstance
    .query({
      query:
        PlanMobilizationClassificationQuery.getMobilizationClassificationForMemo(
          id,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.planMobilizationClassifications.items.map(
        (item) => new PlanMobilizationClassificationResponse(item),
      );
    });

const readPlanMobilizationClassificationPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        PlanMobilizationClassificationQuery.getMobilizationClassificationPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationClassifications.items.map(
        (item) => new PlanMobilizationClassificationResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationClassifications,
        items,
      });
    });

const readPlanMobilizationClassificationQueryPagination = ({
  query,
  take,
  skip,
}) =>
  apolloInstance
    .query({
      query:
        PlanMobilizationClassificationQuery.getMobilizationClassificationQueryPagination(
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
      const items = data.planMobilizationClassifications.items.map(
        (item) => new PlanMobilizationClassificationResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationClassifications,
        items,
      });
    });

const readPlanMobilizationClassificationByPlanIdPagination = ({
  id,
  take,
  skip,
}) =>
  apolloInstance
    .query({
      query:
        PlanMobilizationClassificationQuery.getMobilizationClassificationByPlanIdPagination(
          {
            id,
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.planMobilizationClassifications.items.map(
        (item) => new PlanMobilizationClassificationResponse(item),
      );
      return new PaginationResponse({
        ...data.planMobilizationClassifications,
        items,
      });
    });

const createPlanMobilizationClassification = (body) =>
  postRequest(Router.createMobilizationClassification, body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updatePlanMobilizationClassification = (id, body) =>
  putRequest(Router.updateMobilizationClassification(id), body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updatePlanMobilizationClassificationWithoutFile = (id, body) =>
  putRequest(Router.updateMobilizationClassificationWithoutFile(id), body).then(
    (response) => response,
  );

const deletePlanMobilizationClassification = (id) =>
  deleteRequest(Router.deleteMobilizationClassification(id)).then(
    (response) => response,
  );

const downloadMobilizationClassification = (id) =>
  getRequest(Router.downloadMobilizationClassification(id), {
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
  readPlanMobilizationClassification,
  readPlanMobilizationClassificationById,
  readPlanMobilizationClassificationByPlanId,
  readPlanMobilizationClassificationForMemo,

  readPlanMobilizationClassificationPagination,
  readPlanMobilizationClassificationQueryPagination,
  readPlanMobilizationClassificationByPlanIdPagination,

  createPlanMobilizationClassification,
  updatePlanMobilizationClassification,
  updatePlanMobilizationClassificationWithoutFile,
  deletePlanMobilizationClassification,
  downloadMobilizationClassification,

  mobilizationPlanFileLink,
};

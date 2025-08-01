import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import MobilizationClassificationQuery from '../../graphql/MobilizationClassification/MobilizationClassificationQuery';
import MobilizationClassificationResponse from '../../../dataModels/MobilizationClassification/MobilizationClassificationResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import MobilizationClassificationListResponse from '../../../dataModels/MobilizationClassification/MobilizationClassificationListResponse';

const readMobilizationClassification = () =>
  apolloInstance
    .query({
      query: MobilizationClassificationQuery.getMobilizationClassification,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.mobilizationClassifications.items.map(
        (item) => new MobilizationClassificationResponse(item),
      );
    });

const readMobilizationClassificationById = (id) =>
  apolloInstance
    .query({
      query:
        MobilizationClassificationQuery.getMobilizationClassificationById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new MobilizationClassificationResponse(
        data.mobilizationClassifications.items[0],
      );
    });

const readMobilizationClassificationByIdList = (list) =>
  apolloInstance
    .query({
      query:
        MobilizationClassificationQuery.getMobilizationClassificationByIdList(
          list,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.mobilizationClassifications.items.map(
        (item) => new MobilizationClassificationResponse(item),
      );
    });

const readMobilizationClassificationByPlanId = (id) =>
  apolloInstance
    .query({
      query:
        MobilizationClassificationQuery.getMobilizationClassificationByPlanId(
          id,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.mobilizationClassifications.items.map(
        (item) => new MobilizationClassificationResponse(item),
      );
    });

const readMobilizationClassificationPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        MobilizationClassificationQuery.getMobilizationClassificationPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.mobilizationClassifications.items.map(
        (item) => new MobilizationClassificationResponse(item),
      );
      return new PaginationResponse({
        ...data.mobilizationClassifications,
        items,
      });
    });

const readMobilizationClassificationQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        MobilizationClassificationQuery.getMobilizationClassificationQueryPagination(
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
      const items = data.mobilizationClassifications.items.map(
        (item) => new MobilizationClassificationResponse(item),
      );
      return new PaginationResponse({
        ...data.mobilizationClassifications,
        items,
      });
    });

const createMobilizationClassification = (body) =>
  postRequest(Router.createMobilizationClassification, body).then(
    (response) => response,
  );

const updateMobilizationClassification = (id, body) =>
  putRequest(Router.updateMobilizationClassification(id), body).then(
    (response) => response,
  );

const deleteMobilizationClassification = (id, body) =>
  deleteRequest(Router.updateMobilizationClassification(id), body).then(
    (response) => response,
  );

const getMobilizationClassificationList = () =>
  getRequest(Router.getMobilizationClassificationList).then(
    (response) => new MobilizationClassificationListResponse(response.data),
  );

export default {
  readMobilizationClassification,
  readMobilizationClassificationById,
  readMobilizationClassificationByIdList,
  readMobilizationClassificationByPlanId,

  readMobilizationClassificationPagination,
  readMobilizationClassificationQueryPagination,

  createMobilizationClassification,
  updateMobilizationClassification,
  deleteMobilizationClassification,
  getMobilizationClassificationList,
};

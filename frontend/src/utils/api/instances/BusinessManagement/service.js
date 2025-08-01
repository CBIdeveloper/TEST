import Router from './router';
import store from '../../../../store/store';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import BusinessManagementQuery from '../../graphql/BusinessManagement/BusinessManagementQuery';
import BusinessManagementResponse from '../../../dataModels/BusinessManagement/BusinessManagementResponse';
import ResponsibleBusinessManagementInfoResponse from '../../../dataModels/BusinessManagement/ResponsibleBusinessManagementInfoResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

import FileHelper from '../../../helper/FileHelper';
import ModalHelper from '../../../helper/ModalHelper';
import { multipartFormData } from '../../ApiHeader';
import { setLoading } from '../../../../store/loading/slice';

const readBusinessManagement = () =>
  apolloInstance
    .query({
      query: BusinessManagementQuery.getBusinessManagement,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
    });

const readBusinessManagementById = (id) =>
  apolloInstance
    .query({
      query: BusinessManagementQuery.getBusinessManagementById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new BusinessManagementResponse(
        data.businessManagementTests.items[0],
      );
    });

const readBusinessManagementByType = (type) =>
  apolloInstance
    .query({
      query: BusinessManagementQuery.getBusinessManagementByType(type),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
    });

const readBusinessManagementByTypeAndFirstAgency = ({ type, id }) =>
  apolloInstance
    .query({
      query: BusinessManagementQuery.getBusinessManagementByTypeAndFirstAgency({
        type,
        id,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
    });

const readBusinessManagementByTypeAndSecondaryAgency = ({ type, id }) =>
  apolloInstance
    .query({
      query:
        BusinessManagementQuery.getBusinessManagementByTypeAndSecondaryAgency({
          type,
          id,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
    });

const readBusinessManagementByTypeAndUnit = ({ type, id }) =>
  apolloInstance
    .query({
      query: BusinessManagementQuery.getBusinessManagementByTypeAndUnit({
        type,
        id,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
    });

const readBusinessManagementPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: BusinessManagementQuery.getBusinessManagementPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
      return new PaginationResponse({
        ...data.businessManagementTests,
        items,
      });
    });

const readBusinessManagementQuery = ({ query }) =>
  apolloInstance
    .query({
      query: BusinessManagementQuery.getBusinessManagementQuery({
        query
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
    });

const readBusinessManagementQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: BusinessManagementQuery.getBusinessManagementQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
      return new PaginationResponse({
        ...data.businessManagementTests,
        items,
      });
    });

const readBusinessManagementByTypeAndFirstAgencyPagination = ({
  type,
  id,
  take,
  skip,
}) =>
  apolloInstance
    .query({
      query:
        BusinessManagementQuery.getBusinessManagementByTypeAndFirstAgencyPagination(
          {
            type,
            id,
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
      return new PaginationResponse({
        ...data.businessManagementTests,
        items,
      });
    });

const readBusinessManagementByTypeAndSecondaryAgencyPagination = ({
  type,
  id,
  take,
  skip,
}) =>
  apolloInstance
    .query({
      query:
        BusinessManagementQuery.getBusinessManagementByTypeAndSecondaryAgencyPagination(
          {
            type,
            id,
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
      return new PaginationResponse({
        ...data.businessManagementTests,
        items,
      });
    });

const readBusinessManagementByTypeAndUnitPagination = ({
  type,
  id,
  take,
  skip,
}) =>
  apolloInstance
    .query({
      query:
        BusinessManagementQuery.getBusinessManagementByTypeAndUnitPagination({
          type,
          id,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.businessManagementTests.items.map(
        (item) => new BusinessManagementResponse(item),
      );
      return new PaginationResponse({
        ...data.businessManagementTests,
        items,
      });
    });

const createBusinessManagement = (body) =>
  postRequest(Router.createBusinessManagementTest, body).then(
    (response) => response,
  );

const updateBusinessManagement = (id, body) =>
  putRequest(Router.updateBusinessManagementTest(id), body).then(
    (response) => response,
  );

const deleteBusinessManagement = (id) =>
  deleteRequest(Router.deleteBusinessManagementTest(id)).then(
    (response) => response,
  );

const uploadAttachmentFileRecord = (body) =>
  postRequest(Router.uploadAttachmentFile, body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updateAttachmentFile = (id, body) =>
  postRequest(Router.updateAttachmentFile(id), body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const deleteAttachmentFile = (id) =>
  deleteRequest(Router.deleteAttachmentFile(id)).then((response) => response);

const downloadAttachmentFileRecord = (id) =>
  getRequest(Router.downloadAttachmentFile(id), {
    responseType: 'blob',
  })
    .then((response) => FileHelper.openBlobInTab(response))
    .catch(() => {
      store.dispatch(setLoading(false));
      ModalHelper.openErrorModal({
        message: '開啟檔案發生問題！',
      });
    });

const attachmentFileLink = (id) => Router.attachmentFileLink(id);

const uploadRespondedAttachmentFile = (body) =>
  postRequest(Router.uploadRespondedAttachmentFile, body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const updateRespondedAttachmentFile = (id, body) =>
  postRequest(Router.updateRespondedAttachmentFile(id), body, {
    headers: { ...multipartFormData },
  }).then((response) => response);

const deleteRespondedAttachmentFile = (id) =>
  deleteRequest(Router.deleteRespondedAttachmentFile(id)).then(
    (response) => response,
  );

const downloadRespondedAttachmentFile = (id) =>
  getRequest(Router.downloadRespondedAttachmentFile(id), {
    responseType: 'blob',
  })
    .then((response) => FileHelper.openBlobInTab(response))
    .catch(() => {
      store.dispatch(setLoading(false));
      ModalHelper.openErrorModal({
        message: '開啟檔案發生問題！',
      });
    });

const respondedAttachmentFileLink = (id) =>
  Router.respondedAttachmentFileLink(id);

const getResponsibleBusinessManagementInfoList = () =>
  getRequest(Router.getResponsibleBusinessManagementInfoList).then(
    (response) => new ResponsibleBusinessManagementInfoResponse(response.data),
  );

const createResponseAnswer = (body) =>
  postRequest(Router.createBusinessManagementAnswer, body).then(
    (response) => response,
  );

const signDiffCount = (id) =>
  getRequest(Router.signDiffCount(id)).then((response) => response.data);

const createBusinessManagementSign = (id, body) =>
  postRequest(Router.createBusinessManagementTestSign(id), body).then(
    (response) => response,
  );

const updateTopicEffect = (body) =>
  putRequest(Router.updateTopicEffect, body).then(
    (response) => response,
  );

export default {
  readBusinessManagement,
  readBusinessManagementById,
  readBusinessManagementByType,
  readBusinessManagementByTypeAndFirstAgency,
  readBusinessManagementByTypeAndSecondaryAgency,
  readBusinessManagementByTypeAndUnit,

  readBusinessManagementPagination,
  readBusinessManagementQuery,
  readBusinessManagementQueryPagination,
  readBusinessManagementByTypeAndFirstAgencyPagination,
  readBusinessManagementByTypeAndSecondaryAgencyPagination,
  readBusinessManagementByTypeAndUnitPagination,

  createBusinessManagement,
  updateBusinessManagement,
  deleteBusinessManagement,

  uploadAttachmentFileRecord,
  updateAttachmentFile,
  deleteAttachmentFile,
  downloadAttachmentFileRecord,
  attachmentFileLink,

  uploadRespondedAttachmentFile,
  updateRespondedAttachmentFile,
  deleteRespondedAttachmentFile,
  downloadRespondedAttachmentFile,
  respondedAttachmentFileLink,

  getResponsibleBusinessManagementInfoList,

  createResponseAnswer,

  signDiffCount,
  createBusinessManagementSign,
  updateTopicEffect,
};

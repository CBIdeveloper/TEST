import Router from './router';
import { getRequest, postRequest, putRequest } from '../../axios/axiosMethod';

import { multipartFormData } from '../../ApiHeader';
import CloudDataSearchResponse from '../../../dataModels/FileUpload/CloudDataResponse';
import FileUploadResponse from '../../../dataModels/FileUpload/FileUploadResponse';
import FileUploadResponse2 from '../../../dataModels/FileUpload/FileUploadResponse2';
import UserDataResponse from '../../../dataModels/FileUpload/UserDataResponse';
import apolloInstance from '../../apollo/apolloInstance';
import CloudDataSearchQuery from '../../graphql/CloudDataSearch/CloudDataSearchQuery';
import PaginationResponse from '../../../dataModels/PaginationResponse';
const uploadFiles = (formData, onUploadProgress) => {
  return postRequest(Router.uploadAttachmentFile, formData, {
    headers: { ...multipartFormData },
    onUploadProgress,
  }).then((response) => response);
};
const uploadEditFile = (code) => {
  return postRequest(Router.uploadEditFile(code)).then((response) => response);
};
const getDataByCode = (code) =>
  getRequest(Router.getFile(code)).then(
    (response) => new FileUploadResponse(response.data),
  );

const getData = async () =>
  apolloInstance
    .query({
      query: CloudDataSearchQuery.getCloudDataSearch,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.cloudDataSearchs.items.map(
        (item) => new CloudDataSearchResponse(item),
      );
    });

const getData2 = () =>
  getRequest(Router.getFile3).then(
    (response) => new FileUploadResponse2(response.data),
  );

const getUserData = (id) =>
  getRequest(Router.getFile4(id)).then(
    (response) => new UserDataResponse(response.data),
  );

const updateQuantity = (formData2) => {
  return putRequest(Router.updateQuantity, formData2, {
    headers: { ...multipartFormData },
  }).then((response) => response);
};

const sendEmailByCode = (id) => {
  postRequest(Router.sendEmail(id)).then((response) => response);
};

const getExcelTable = () =>
  getRequest(Router.getExcel).then(
    (response) => response,
  );

const readCloudDataSearch = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: CloudDataSearchQuery.getCloudDataSearchQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.cloudDataSearchs.items.map(
        (item) => new CloudDataSearchResponse(item),
      );
      return new PaginationResponse({
        ...data.cloudDataSearchs,
        items,
      });
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      throw error;
    })
    .finally(() => {
      console.log('Query completed');
    });
export default {
  uploadFiles,
  uploadEditFile,
  getDataByCode,
  getData,
  getData2,
  getUserData,
  updateQuantity,
  sendEmailByCode,
  readCloudDataSearch,
  getExcelTable,
};

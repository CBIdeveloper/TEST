import Router from './router';
import { getRequest, postRequest, putRequest } from '../../axios/axiosMethod';
import { multipartFormData } from '../../ApiHeader';
import NonReasonResponse from './NonReasonResponse';
const cloudDataEditData = (code) =>
  getRequest(Router.getcloudDataEditData(code)).then((response) => response);

const cloudDataEditData2 = (code, updatedUserAccountId) =>
  getRequest(Router.getcloudDataEditData2(code, updatedUserAccountId)).then(
    (response) => response,
  );

const coverData = (formData) => {
  return postRequest(Router.coverData, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response);
};

const updateStatusById = (formData) => {
  return putRequest(Router.updataData, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response);
};

const updateLog = (formData) => {
  return postRequest(Router.log, formData, {
    headers: { ...multipartFormData },
  }).then((response) => response);
};

const nonReason = (id) => getRequest(Router.getNonReason(id)).then(
  (response) => new NonReasonResponse(response.data));
export default {
  cloudDataEditData,
  cloudDataEditData2,
  coverData,
  updateStatusById,
  updateLog,
  nonReason,
};

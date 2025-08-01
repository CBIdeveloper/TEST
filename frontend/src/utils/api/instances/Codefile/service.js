import Router from './router';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  postRequest,
  putRequest,
  getRequest,
} from '../../axios/axiosMethod';

import CodefileQuery from '../../graphql/Codefile/CodefileQuery';
import CodefileResponse from '../../../dataModels/Codefile/CodefileResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import CodefileListResponse from '../../../dataModels/Codefile/CodefileListResponse';

const readCodefile = () =>
  apolloInstance
    .query({
      query: CodefileQuery.getCodefile,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.codefiles.items.map((item) => new CodefileResponse(item));
    });

const readCodefileById = (id) =>
  apolloInstance
    .query({
      query: CodefileQuery.getCodefileById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new CodefileResponse(data.codefiles.items[0]);
    });

const readCodefilePagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: CodefileQuery.getCodefilePagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.codefiles.items.map(
        (item) => new CodefileResponse(item),
      );
      return new PaginationResponse({
        ...data.codefiles,
        items,
      });
    });

const readCodefileQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: CodefileQuery.getCodefileQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.codefiles.items.map(
        (item) => new CodefileResponse(item),
      );
      return new PaginationResponse({
        ...data.codefiles,
        items,
      });
    });

const createCodefile = (body) =>
  postRequest(Router.createCodefile, body).then((response) => response);

const updateCodefile = (id, body) =>
  putRequest(Router.updateCodefile(id), body).then((response) => response);

const deleteCodefile = (id, body) =>
  deleteRequest(Router.deleteCodefile(id), body).then((response) => response);

const getMilitarylevelList = () =>
  getRequest(Router.getMilitarylevelList).then(
    (response) => new CodefileListResponse(response.data),
  );

const getMilitaryAgencyList = () =>
  getRequest(Router.getMilitaryAgencyList).then(
    (response) => new CodefileListResponse(response.data),
  );

const getMeetingTypeList = () =>
  getRequest(Router.getMeetingTypeList).then(
    (response) => new CodefileListResponse(response.data),
  );
export default {
  readCodefile,
  readCodefileById,
  readCodefilePagination,
  readCodefileQueryPagination,

  createCodefile,
  updateCodefile,
  deleteCodefile,
  getMilitarylevelList,
  getMilitaryAgencyList,
  getMeetingTypeList,
};

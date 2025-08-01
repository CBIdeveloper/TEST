import Router from './router';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import PermissionApplicationQuery from '../../graphql/PermissionApplication/PermissionApplicationQuery';
import PermissionApplicationResponse from '../../../dataModels/PermissionApplication/PermissionApplicationResponse';
import PermissionApproveQuery from '../../graphql/PermissionApplication/PermissionApproveQuery';
import PermissionApproveResponse from '../../../dataModels/PermissionApprove/PermissionApproveResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readPermissionApplication = () =>
  apolloInstance
    .query({
      query: PermissionApplicationQuery.getPermissionApplication,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.permissionApplications.items.map(
        (item) => new PermissionApplicationResponse(item),
      );
    });

const readPermissionApplicationById = (id) =>
  apolloInstance
    .query({
      query: PermissionApplicationQuery.getPermissionApplicationById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new PermissionApplicationResponse(
        data.permissionApplications.items[0],
      );
    });

const readPermissionApplicationPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: PermissionApplicationQuery.getPermissionApplicationPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.permissionApplications.items.map(
        (item) => new PermissionApplicationResponse(item),
      );
      return new PaginationResponse({
        ...data.permissionApplications,
        items,
      });
    });

const readPermissionApplicationQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: PermissionApplicationQuery.getPermissionApplicationQueryPagination(
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
      const items = data.permissionApplications.items.map(
        (item) => new PermissionApplicationResponse(item),
      );
      return new PaginationResponse({
        ...data.permissionApplications,
        items,
      });
    });

const createPermissionApplication = (body) =>
  postRequest(Router.createPermissionApplication, body).then(
    (response) => response,
  );

const deletePermissionApplication = (id, body) =>
  deleteRequest(Router.deletePermissionApplication(id), body).then(
    (response) => response,
  );

const readPermissionApproveById = (id) =>
  apolloInstance
    .query({
      query: PermissionApproveQuery.getPermissionApproveById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new PermissionApproveResponse(data.permissionApproves.items[0]);
    });

const readPermissionApprovePagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: PermissionApproveQuery.getPermissionApprovePagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.permissionApproves.items.map(
        (item) => new PermissionApproveResponse(item),
      );
      return new PaginationResponse({
        ...data.permissionApproves,
        items,
      });
    });

const readPermissionApproveQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: PermissionApproveQuery.getPermissionApproveQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.permissionApproves.items.map(
        (item) => new PermissionApproveResponse(item),
      );
      return new PaginationResponse({
        ...data.permissionApproves,
        items,
      });
    });

const approvePermissionApplication = (id, body) =>
  putRequest(Router.approvePermissionApplication(id), body).then(
    (response) => response,
  );

const readPermissionApplicationExpiration = () =>
  getRequest(Router.getPermissionApplicationExpiration()).then(
    (response) => response,
  );

const readPlainCode = () =>
  getRequest(Router.getPlainCode()).then((response) => response);

export default {
  readPermissionApplication,
  readPermissionApplicationById,

  readPermissionApplicationPagination,
  readPermissionApplicationQueryPagination,
  readPermissionApproveById,
  readPermissionApprovePagination,
  readPermissionApproveQueryPagination,

  createPermissionApplication,
  deletePermissionApplication,
  approvePermissionApplication,
  readPermissionApplicationExpiration,
  readPlainCode,
};

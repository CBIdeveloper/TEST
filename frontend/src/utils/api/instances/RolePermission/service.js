import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import RolePermissionQuery from '../../graphql/RolePermission/RolePermissionQuery';
import RolePermissionResponse from '../../../dataModels/RolePermission/RolePermissionResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readRolePermission = () =>
  apolloInstance
    .query({
      query: RolePermissionQuery.getRolePermission,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.rolePermissions.items.map(
        (item) => new RolePermissionResponse(item),
      );
    });

const readRolePermissionById = (id) =>
  apolloInstance
    .query({
      query: RolePermissionQuery.getRolePermissionById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new RolePermissionResponse(data.rolePermissions.items[0]);
    });

const readRolePermissionByPermissionName = (name) =>
  apolloInstance
    .query({
      query: RolePermissionQuery.getRolePermissionByPermissionName(name),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.rolePermissions.items.map(
        (item) => new RolePermissionResponse(item),
      );
    });

const readRolePermissionByDisplayName = (name) =>
  apolloInstance
    .query({
      query: RolePermissionQuery.getRolePermissionByDisplayName(name),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.rolePermissions.items.map(
        (item) => new RolePermissionResponse(item),
      );
    });

const readRolePermissionPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: RolePermissionQuery.getRolePermissionPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.rolePermissions.items.map(
        (item) => new RolePermissionResponse(item),
      );
      return new PaginationResponse({
        ...data.rolePermissions,
        items,
      });
    });

const readRolePermissionQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: RolePermissionQuery.getRolePermissionQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.rolePermissions.items.map(
        (item) => new RolePermissionResponse(item),
      );
      return new PaginationResponse({
        ...data.rolePermissions,
        items,
      });
    });

const createRolePermission = (body) =>
  postRequest(Router.createRolePermission, body).then((response) => response);

const updateRolePermission = (id, body) =>
  putRequest(Router.updateRolePermission(id), body).then(
    (response) => response,
  );

const deleteRolePermission = (id) =>
  deleteRequest(Router.deleteRolePermission(id)).then((response) => response);

export default {
  readRolePermission,
  readRolePermissionById,
  readRolePermissionByPermissionName,
  readRolePermissionByDisplayName,

  readRolePermissionPagination,
  readRolePermissionQueryPagination,

  createRolePermission,
  updateRolePermission,
  deleteRolePermission,
};

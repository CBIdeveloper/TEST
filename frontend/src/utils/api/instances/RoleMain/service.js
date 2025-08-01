import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import RoleMainQuery from '../../graphql/RoleMain/RoleMainQuery';
import RoleMainResponse from '../../../dataModels/RoleMain/RoleMainResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readRoleMain = () =>
  apolloInstance
    .query({
      query: RoleMainQuery.getRoleMain,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.roleMains.items.map((item) => new RoleMainResponse(item));
    });

const readRoleMainById = (id) =>
  apolloInstance
    .query({
      query: RoleMainQuery.getRoleMainById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new RoleMainResponse(data.roleMains.items[0]);
    });

const readRoleMainPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: RoleMainQuery.getRoleMainPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.roleMains.items.map(
        (item) => new RoleMainResponse(item),
      );
      return new PaginationResponse({
        ...data.roleMains,
        items,
      });
    });

const readRoleMainQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: RoleMainQuery.getRoleMainQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.roleMains.items.map(
        (item) => new RoleMainResponse(item),
      );
      return new PaginationResponse({
        ...data.roleMains,
        items,
      });
    });

const createRoleMain = (body) =>
  postRequest(Router.createRoleMain, body).then((response) => response);

const updateRoleMain = (id, body) =>
  putRequest(Router.updateRoleMain(id), body).then((response) => response);

const deleteRoleMain = (id) =>
  deleteRequest(Router.deleteRoleMain(id)).then((response) => response);

export default {
  readRoleMain,
  readRoleMainById,

  readRoleMainPagination,
  readRoleMainQueryPagination,

  createRoleMain,
  updateRoleMain,
  deleteRoleMain,
};

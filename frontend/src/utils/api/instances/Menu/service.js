import Router from './router';

import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import MenuQuery from '../../graphql/Menu/MenuQuery';
import MenuResponse from '../../../dataModels/Menu/MenuResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readMenu = () =>
  apolloInstance
    .query({
      query: MenuQuery.getMenu,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.menus.items.map((item) => new MenuResponse(item));
    });

const readMenuById = (id) =>
  apolloInstance
    .query({
      query: MenuQuery.getMenuById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new MenuResponse(data.menus.items[0]);
    });

const readMenuPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: MenuQuery.getMenuPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.menus.items.map((item) => new MenuResponse(item));
      return new PaginationResponse({
        ...data.menus,
        items,
      });
    });

const readMenuQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: MenuQuery.getMenuQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.menus.items.map((item) => new MenuResponse(item));
      return new PaginationResponse({
        ...data.menus,
        items,
      });
    });

const createMenu = (body) =>
  postRequest(Router.createMenu, body).then((response) => response);

const updateMenu = (id, body) =>
  putRequest(Router.updateMenu(id), body).then((response) => response);

const deleteMenu = (id, body) =>
  deleteRequest(Router.deleteMenu(id), body).then((response) => response);

export default {
  readMenu,
  readMenuById,

  readMenuPagination,
  readMenuQueryPagination,

  createMenu,
  updateMenu,
  deleteMenu,
};

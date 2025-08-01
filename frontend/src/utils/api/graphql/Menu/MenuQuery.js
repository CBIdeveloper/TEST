import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      menus ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          menuName
          menuType
          parentMenuId
          parentMenu {
            menuName
          }
          controller
          action
          url
          param
          sequenceNumber
          isVisible
          isCreatable
          isUpdatable
          isDeletable
          isAuditable
          isExportable
          isExisted
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getMenu = baseQuery('');

const getMenuById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getMenuPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getMenuQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getMenu,
  getMenuById,

  getMenuPagination,
  getMenuQueryPagination,
};

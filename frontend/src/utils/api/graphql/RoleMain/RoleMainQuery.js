import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      roleMains ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          roleName
          roleMemo
          ownedPermissionGroups {
            permissionGroupCode
          }
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getRoleMain = baseQuery('');

const getRoleMainById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getRoleMainPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getRoleMainQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getRoleMain,
  getRoleMainById,

  getRoleMainPagination,
  getRoleMainQueryPagination,
};

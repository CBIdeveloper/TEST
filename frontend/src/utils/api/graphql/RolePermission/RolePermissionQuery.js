import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      rolePermissions ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          urlEntrypoint
          permissionName
          displayName
          isPostable
          isPutable
          isDeletable
          isReadable
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getRolePermission = baseQuery('');

const getRolePermissionById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getRolePermissionByPermissionName = (name) =>
  baseQuery(`(where: {permissionName: {eq: "${name}"}})`);

const getRolePermissionByDisplayName = (name) =>
  baseQuery(`(where: {displayName: {eq: "${name}"}})`);

const getRolePermissionPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getRolePermissionQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getRolePermission,
  getRolePermissionById,
  getRolePermissionByPermissionName,
  getRolePermissionByDisplayName,

  getRolePermissionPagination,
  getRolePermissionQueryPagination,
};

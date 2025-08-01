import { gql } from '@apollo/client';

const baseQuery = (condition) => {
    const query = `
    query {
      permissionApproves ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          unitName
          useStartDate
          useEndDate
          requirements
          status
          createdAt
          braidingCategory
          auditOpinion
        }
      }
    }
  `;
    return gql(query);
};

const getPermissionApprove = baseQuery('');

const getPermissionApproveById = (id) =>
    baseQuery(
        `(where: {id: {eq: ${id}}})`,
    );

const getPermissionApprovePagination = ({ take, skip }) =>
    baseQuery(
        `(take: ${take}, skip: ${skip})`,
    );

const getPermissionApproveQueryPagination = ({ query, take, skip }) =>
    baseQuery(
        `(${query}, take: ${take}, skip: ${skip})`,
    );

export default {
    getPermissionApprove,
    getPermissionApproveById,

    getPermissionApprovePagination,
    getPermissionApproveQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
    const query = `
    query {
      permissionApplications ${condition} {
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
          braidingCategory
          status
          createdAt
          auditOpinion
        }
      }
    }
  `;
    return gql(query);
};

const getPermissionApplication = baseQuery('');

const getPermissionApplicationById = (id) =>
    baseQuery(
        `(where: {id: {eq: ${id}}})`,
    );

const getPermissionApplicationPagination = ({ take, skip }) =>
    baseQuery(
        `(take: ${take}, skip: ${skip})`,
    );

const getPermissionApplicationQueryPagination = ({ query, take, skip }) =>
    baseQuery(
        `(${query}, take: ${take}, skip: ${skip})`,
    );

const getPlainCodeBySysUserAccountId = (application_user_account_id) =>
    baseQuery(
        `(where: {application_user_account_id: {eq: ${application_user_account_id}}})`,
    );

export default {
    getPermissionApplication,
    getPermissionApplicationById,

    getPermissionApplicationPagination,
    getPermissionApplicationQueryPagination,
};

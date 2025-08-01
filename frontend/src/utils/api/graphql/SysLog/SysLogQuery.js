import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      sysLogs ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          type
          state
          description
          assoiciatedUserAccountId
          assoiciatedUserAccount {
            name
            account
            firstlevelUnit {
              fullName
            }
            firstlevelAgency {
              shortName
            }
            secondaryAgency {
              shortName
            }
          }
          loggedAt
          ip
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getSysLog = baseQuery('');

const getSysLogById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: { loggedAt: DESC })`);

const getSysLogPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: { loggedAt: DESC })`);

const getSysLogQueryPagination = ({ query, take, skip }) =>
  baseQuery(
    `(${query}, take: ${take}, skip: ${skip}, order: { loggedAt: DESC })`,
  );

export default {
  getSysLog,
  getSysLogById,

  getSysLogPagination,
  getSysLogQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrReservistPids ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          pid
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

// const getUniqueHrReservistPid = baseQuery('(order: {creDate: DESC})');
const getUniqueHrReservistPid = baseQuery('');

const getUniqueHrReservistPidPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);
// baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrReservistPidQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);
// baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrReservistPid,

  getUniqueHrReservistPidPagination,
  getUniqueHrReservistPidQueryPagination,
};

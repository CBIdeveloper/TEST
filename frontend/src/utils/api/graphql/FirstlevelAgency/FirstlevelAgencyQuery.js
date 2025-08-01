import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      firstlevelAgencies ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          enCode
          shortName
          fullName
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFirstlevelAgency = baseQuery('');

const getFirstlevelAgencyById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getFirstlevelAgencyPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getFirstlevelAgencyQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getFirstlevelAgency,
  getFirstlevelAgencyById,

  getFirstlevelAgencyPagination,
  getFirstlevelAgencyQueryPagination,
};

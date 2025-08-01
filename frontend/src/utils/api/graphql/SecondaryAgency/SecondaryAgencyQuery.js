import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      secondaryAgencies ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          enCode
          fullName
          shortName
          firstlevelAgencyId
          firstlevelAgency {
            fullName
            shortName
          }
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getSecondaryAgency = baseQuery('');

const getSecondaryAgencyById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getSecondaryAgencyByFirstLevelId = (id) =>
  baseQuery(`(where: {firstlevelAgencyId: {eq: ${id}}})`);

const getSecondaryAgencyPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getSecondaryAgencyQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getSecondaryAgency,
  getSecondaryAgencyById,
  getSecondaryAgencyByFirstLevelId,

  getSecondaryAgencyPagination,
  getSecondaryAgencyQueryPagination,
};

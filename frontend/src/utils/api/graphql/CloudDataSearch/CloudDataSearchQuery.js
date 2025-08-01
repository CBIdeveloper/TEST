import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      cloudDataSearchs ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          code
          checkUserAccountId
          checkAt
          transAt
          cityId
          firstlevelUnitId
          complianceQuantity
          nonComplianceQuantity
          transCount
          editAgency
          editor
          fullName
          mobilizationAgency
        }
      }
    }
  `;
  return gql(query);
};

const getCloudDataSearch = baseQuery('');

const getCloudDataSearchQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getCloudDataSearch,
  getCloudDataSearchQueryPagination,
};

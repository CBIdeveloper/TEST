import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      accumulatedLoginNumbers ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          numberOfLogin
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getAccumulatedLoginNumber = baseQuery('');

export default {
  getAccumulatedLoginNumber,
};

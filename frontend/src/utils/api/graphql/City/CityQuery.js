import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      cities ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          enCode
          cityName
          areaCode
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getCity = baseQuery('');

const getCityById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getCityByAreaCode = (id) => baseQuery(`(where: {areaCode: {eq: ${id}}})`);

export default {
  getCity,
  getCityById,
  getCityByAreaCode,
};

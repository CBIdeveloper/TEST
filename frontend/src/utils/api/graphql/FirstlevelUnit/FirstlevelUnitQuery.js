import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      firstlevelUnits ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          fullName
          cityId
          city {
            cityName
          }
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFirstlevelUnit = baseQuery('');

const getFirstlevelUnitById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getFirstlevelUnitByCityId = (id) =>
  baseQuery(`(where: {cityId: {eq: ${id}}})`);

export default {
  getFirstlevelUnit,
  getFirstlevelUnitById,
  getFirstlevelUnitByCityId,
};

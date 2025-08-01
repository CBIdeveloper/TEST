import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frWaterPurifies ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          unitName
          unitAddress
          unitTel
    
          creDate
          facilityName
          facilityX
          facilityY
          dailyWatersupply
          waterPopulation
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrWaterPurify = baseQuery('(order: {creDate: DESC})');

const getFrWaterPurifyById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrWaterPurifyPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrWaterPurifyQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrWaterPurify,
  getFrWaterPurifyById,

  getFrWaterPurifyPagination,
  getFrWaterPurifyQueryPagination,
};

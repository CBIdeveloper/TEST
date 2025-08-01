import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frOils ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          unitName

          creDate
          type
          stock
          storageDay
          storageFacility
          storageCity
          safetyStock
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrOil = baseQuery('(order: {creDate: DESC})');

const getFrOilById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrOilPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrOilQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrOil,
  getFrOilById,

  getFrOilPagination,
  getFrOilQueryPagination,
};

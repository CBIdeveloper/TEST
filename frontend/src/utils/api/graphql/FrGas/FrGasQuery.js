import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frGas ${condition} {
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

const getFrGas = baseQuery('(order: {creDate: DESC})');

const getFrGasById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrGasPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrGasQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrGas,
  getFrGasById,

  getFrGasPagination,
  getFrGasQueryPagination,
};

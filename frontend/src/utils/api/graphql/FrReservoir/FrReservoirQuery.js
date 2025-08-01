import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frReservoirs ${condition} {
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
          reservoirName
          reservoirX
          reservoirY
          functiontype
          waterStorage
          maxStorage
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrReservoir = baseQuery('(order: {creDate: DESC})');

const getFrReservoirById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrReservoirPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrReservoirQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrReservoir,
  getFrReservoirById,

  getFrReservoirPagination,
  getFrReservoirQueryPagination,
};

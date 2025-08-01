import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frCoals ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          tel
          
          companyName
          companyTel
    
          creDate
          type
          storageName
          facilityAddress
          facilityCity
          facilityTown
          facilityVillage
          stock
          stockDays
          maxstock
          maxstockDays
          dailyUsage
          safetyStock
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrCoal = baseQuery('(order: {creDate: DESC})');

const getFrCoalById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrCoalPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrCoalQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrCoal,
  getFrCoalById,

  getFrCoalPagination,
  getFrCoalQueryPagination,
};

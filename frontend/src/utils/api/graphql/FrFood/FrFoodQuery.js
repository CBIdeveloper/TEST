import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frFoods ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          creDate
          publicfoodBusin
          publicfoodStock
          rollingFacility
          safetyStock
          safetyDays
          population
          availableDays
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrFood = baseQuery('(order: {creDate: DESC})');

const getFrFoodById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrFoodPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrFoodQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrFood,
  getFrFoodById,

  getFrFoodPagination,
  getFrFoodQueryPagination,
};

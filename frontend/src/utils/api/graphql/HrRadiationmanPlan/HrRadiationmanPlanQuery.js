import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrRadiationmanPlans ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          pid
    
          creDate
          planType
          planStart
          planEnd
          planPlace
          planCity
          planTown
          planVillage
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrRadiationmanPlan = baseQuery('');

const getHrRadiationmanPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrRadiationmanPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrRadiationmanPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrRadiationmanPlan,
  getHrRadiationmanPlanByPid,

  getHrRadiationmanPlanPagination,
  getHrRadiationmanPlanQueryPagination,
};

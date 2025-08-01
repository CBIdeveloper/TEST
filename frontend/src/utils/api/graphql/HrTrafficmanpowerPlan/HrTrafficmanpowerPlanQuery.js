import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrTrafficmanpowerPlans ${condition} {
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

const getHrTrafficmanpowerPlan = baseQuery('');

const getHrTrafficmanpowerPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrTrafficmanpowerPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrTrafficmanpowerPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrTrafficmanpowerPlan,
  getHrTrafficmanpowerPlanByPid,

  getHrTrafficmanpowerPlanPagination,
  getHrTrafficmanpowerPlanQueryPagination,
};

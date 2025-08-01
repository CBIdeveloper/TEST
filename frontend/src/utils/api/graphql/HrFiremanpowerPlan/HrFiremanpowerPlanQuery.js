import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrFiremanpowerPlans ${condition} {
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

const getHrFiremanpowerPlan = baseQuery('');

const getHrFiremanpowerPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrFiremanpowerPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrFiremanpowerPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrFiremanpowerPlan,
  getHrFiremanpowerPlanByPid,

  getHrFiremanpowerPlanPagination,
  getHrFiremanpowerPlanQueryPagination,
};

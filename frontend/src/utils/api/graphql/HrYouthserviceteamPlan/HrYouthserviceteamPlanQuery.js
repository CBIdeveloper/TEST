import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrYouthserviceteamPlans ${condition} {
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

const getHrYouthserviceteamPlan = baseQuery('');

const getHrYouthserviceteamPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrYouthserviceteamPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrYouthserviceteamPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrYouthserviceteamPlan,
  getHrYouthserviceteamPlanByPid,

  getHrYouthserviceteamPlanPagination,
  getHrYouthserviceteamPlanQueryPagination,
};

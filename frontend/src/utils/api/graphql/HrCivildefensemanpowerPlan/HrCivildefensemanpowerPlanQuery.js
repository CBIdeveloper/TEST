import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrCivildefensemanpowerPlans ${condition} {
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

const getHrCivildefensemanpowerPlan = baseQuery('');

const getHrCivildefensemanpowerPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrCivildefensemanpowerPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrCivildefensemanpowerPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrCivildefensemanpowerPlan,
  getHrCivildefensemanpowerPlanByPid,

  getHrCivildefensemanpowerPlanPagination,
  getHrCivildefensemanpowerPlanQueryPagination,
};

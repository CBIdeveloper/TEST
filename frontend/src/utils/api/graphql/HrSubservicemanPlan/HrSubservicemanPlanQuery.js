import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrSubservicemanPlans ${condition} {
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

const getHrSubservicemanPlan = baseQuery('');

const getHrSubservicemanPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrSubservicemanPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrSubservicemanPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrSubservicemanPlan,
  getHrSubservicemanPlanByPid,

  getHrSubservicemanPlanPagination,
  getHrSubservicemanPlanQueryPagination,
};

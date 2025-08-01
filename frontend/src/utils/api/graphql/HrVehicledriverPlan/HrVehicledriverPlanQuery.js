import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrVehicledriverPlans ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          pid
    
          planType
          planStart
          planEnd
          planPlace
          planCity
          planTown
          planVillage
          
          creDate
          levyUnit
          levyCartype
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrVehicledriverPlan = baseQuery('');

const getHrVehicledriverPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrVehicledriverPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrVehicledriverPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrVehicledriverPlan,
  getHrVehicledriverPlanByPid,

  getHrVehicledriverPlanPagination,
  getHrVehicledriverPlanQueryPagination,
};

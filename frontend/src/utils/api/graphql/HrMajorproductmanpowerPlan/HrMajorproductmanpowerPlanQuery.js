import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrMajorproductmanpowerPlans ${condition} {
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

const getHrMajorproductmanpowerPlan = baseQuery('');

const getHrMajorproductmanpowerPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrMajorproductmanpowerPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrMajorproductmanpowerPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrMajorproductmanpowerPlan,
  getHrMajorproductmanpowerPlanByPid,

  getHrMajorproductmanpowerPlanPagination,
  getHrMajorproductmanpowerPlanQueryPagination,
};

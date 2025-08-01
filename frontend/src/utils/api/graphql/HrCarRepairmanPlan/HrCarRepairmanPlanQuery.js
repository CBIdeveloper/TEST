import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrCarRepairmanPlans ${condition} {
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

const getHrCarRepairmanPlan = baseQuery('');

const getHrCarRepairmanPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrCarRepairmanPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrCarRepairmanPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrCarRepairmanPlan,
  getHrCarRepairmanPlanByPid,

  getHrCarRepairmanPlanPagination,
  getHrCarRepairmanPlanQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrMedicalmanPlans ${condition} {
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

const getHrMedicalmanPlan = baseQuery('');

const getHrMedicalmanPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrMedicalmanPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrMedicalmanPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrMedicalmanPlan,
  getHrMedicalmanPlanByPid,

  getHrMedicalmanPlanPagination,
  getHrMedicalmanPlanQueryPagination,
};

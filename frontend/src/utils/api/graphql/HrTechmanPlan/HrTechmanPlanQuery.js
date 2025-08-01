import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrTechmanPlans ${condition} {
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
          levySkill
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrTechmanPlan = baseQuery('');

const getHrTechmanPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrTechmanPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrTechmanPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrTechmanPlan,
  getHrTechmanPlanByPid,

  getHrTechmanPlanPagination,
  getHrTechmanPlanQueryPagination,
};

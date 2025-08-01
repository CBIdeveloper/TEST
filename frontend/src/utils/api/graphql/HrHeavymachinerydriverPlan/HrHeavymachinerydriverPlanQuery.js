import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrHeavymachinerydriverPlans ${condition} {
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
          
          creDate
          levyUnit
          levySkill
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrHeavymachinerydriverPlan = baseQuery('');

const getHrHeavymachinerydriverPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrHeavymachinerydriverPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrHeavymachinerydriverPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrHeavymachinerydriverPlan,
  getHrHeavymachinerydriverPlanByPid,

  getHrHeavymachinerydriverPlanPagination,
  getHrHeavymachinerydriverPlanQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrAcDroneOperatorPlans ${condition} {
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
          levyType
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrAcDroneOperatorPlan = baseQuery('');

const getHrAcDroneOperatorPlanByPid = (id) =>
  baseQuery(`(where: {pid: {eq: "${id}"}})`);

const getHrAcDroneOperatorPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getHrAcDroneOperatorPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getHrAcDroneOperatorPlan,
  getHrAcDroneOperatorPlanByPid,

  getHrAcDroneOperatorPlanPagination,
  getHrAcDroneOperatorPlanQueryPagination,
};

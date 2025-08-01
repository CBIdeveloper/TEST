import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frChemicalProtectPlans ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
    
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

const getFrChemicalProtectPlan = baseQuery('');

const getFrChemicalProtectPlanByName = (name) =>
  baseQuery(`(where: {name: {eq: "${name}"}})`);

const getFrChemicalProtectPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getFrChemicalProtectPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getFrChemicalProtectPlan,
  getFrChemicalProtectPlanByName,

  getFrChemicalProtectPlanPagination,
  getFrChemicalProtectPlanQueryPagination,
};

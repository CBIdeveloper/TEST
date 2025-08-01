import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frRadiationProtectPlans ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          companyName
          protectionName
          quality
    
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

const getFrRadiationProtectPlan = baseQuery('');

const getFrRadiationProtectPlanByCompanyName = (companyName) =>
  baseQuery(`(where: {companyName: {eq: "${companyName}"}})`);

const getFrRadiationProtectPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getFrRadiationProtectPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getFrRadiationProtectPlan,
  getFrRadiationProtectPlanByCompanyName,

  getFrRadiationProtectPlanPagination,
  getFrRadiationProtectPlanQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      mobilizationPlans ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          planName
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getMobilizationPlan = baseQuery(`(where: {deletedAt: {eq: ${null}}})`);

const getMobilizationPlanById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getMobilizationPlanByIdList = (list) =>
  baseQuery(`(where: {id: {in: ${list}}})`);

const getMobilizationPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getMobilizationPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getMobilizationPlan,
  getMobilizationPlanById,
  getMobilizationPlanByIdList,

  getMobilizationPlanPagination,
  getMobilizationPlanQueryPagination,
};

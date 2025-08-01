import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      planMobilizationPlans ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          mobilizationPlanSubject
          releaseDate
          mobilizationPlanId
          mobilizationPlan {
            planName
          }
          releaseFirstlevelAgencyId
          releaseFirstlevelAgency {
            fullName
            shortName
          }
          uploadedFileName
          updatedAt
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getMobilizationPlan = baseQuery('(order: { releaseDate: DESC })');

const getMobilizationPlanById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getMobilizationPlanByPlanId = (id) =>
  baseQuery(
    `(where: {mobilizationPlanId: {eq: ${id}}}, order: { releaseDate: DESC })`,
  );

const getMobilizationPlanForMemo = (date) =>
  baseQuery(
    `(where: {updatedAt: {gte: "${date}"}}, order: { releaseDate: DESC })`,
  );

const getMobilizationPlanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`);

const getMobilizationPlanQueryPagination = ({ query, take, skip }) =>
  baseQuery(
    `(${query}, take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`,
  );

const getMobilizationPlanByPlanIdPagination = ({ id, take, skip }) =>
  baseQuery(
    `(where: {mobilizationPlanId: {eq: ${id}}}, take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`,
  );

export default {
  getMobilizationPlan,
  getMobilizationPlanById,
  getMobilizationPlanByPlanId,
  getMobilizationPlanForMemo,

  getMobilizationPlanPagination,
  getMobilizationPlanQueryPagination,
  getMobilizationPlanByPlanIdPagination,
};

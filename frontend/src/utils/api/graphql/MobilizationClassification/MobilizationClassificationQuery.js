import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      mobilizationClassifications ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          classificationName
          mobilizationPlanId
          mobilizationPlan {
            planName
          }
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getMobilizationClassification = baseQuery('');

const getMobilizationClassificationById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}})`);

const getMobilizationClassificationByIdList = (list) =>
  baseQuery(`(where: {id: {in: ${list}}})`);

const getMobilizationClassificationByPlanId = (id) =>
  baseQuery(`(where: {mobilizationPlanId: {eq: ${id}}})`);

const getMobilizationClassificationPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getMobilizationClassificationQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getMobilizationClassification,
  getMobilizationClassificationById,
  getMobilizationClassificationByIdList,
  getMobilizationClassificationByPlanId,

  getMobilizationClassificationPagination,
  getMobilizationClassificationQueryPagination,
};

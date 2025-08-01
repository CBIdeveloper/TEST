import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      braidingCategories ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          categoryType
          fullName
          mobilizationClassificationId
          mobilizationClassification {
            classificationName
            mobilizationPlanId
            mobilizationPlan {
              planName
            }
          }
          code
          projectManagementNumber
          updateCycle
          systemNum
          transmissionDate
          sort
          unit
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getBraidingCategory = baseQuery('');

const getBraidingCategoryById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getBraidingCategoryByCode = (code) => baseQuery(`(where: {code: {eq: "${code}"}})`);

const getBraidingCategoryByIdList = (list) => baseQuery(`(where: {id: {in: ${list}}})`);

const getBraidingCategoryByCategoryType = (type) =>
  baseQuery(`(where: {categoryType: {eq: "${type}"}})`);

const getBraidingCategoryByClassificationId = (id) =>
  baseQuery(`(where: {mobilizationClassificationId: {eq: ${id}}})`);

const getBraidingCategoryByPlanId = (id) =>
  baseQuery(
    `(where: { mobilizationClassification: { mobilizationPlanId:{eq: ${id} } }})`,
  );

const getBraidingCategoryPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getBraidingCategoryQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getBraidingCategory,
  getBraidingCategoryById,
  getBraidingCategoryByCode,
  getBraidingCategoryByIdList,
  getBraidingCategoryByCategoryType,
  getBraidingCategoryByClassificationId,
  getBraidingCategoryByPlanId,

  getBraidingCategoryPagination,
  getBraidingCategoryQueryPagination,
};

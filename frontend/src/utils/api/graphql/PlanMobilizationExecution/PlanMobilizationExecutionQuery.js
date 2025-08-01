import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      planMobilizationExecutions ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          mobilizationExecutionSubject
          releaseDate
          cityId
          city {
            cityName
          }
          releaseFirstlevelUnitId
          releaseFirstlevelUnit {
            fullName
          }
          createdUserAccountId
          uploadedFileName
          updatedAt
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getMobilizationExecution = baseQuery('(order: { releaseDate: DESC })');

const getMobilizationExecutionById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}})`);

const getMobilizationExecutionForMemo = (date) =>
  baseQuery(
    `(where: {updatedAt: {gte: "${date}"}}, order: { releaseDate: DESC })`,
  );

const getMobilizationExecutionPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`);

const getMobilizationExecutionQueryPagination = ({ query, take, skip }) =>
  baseQuery(
    `(${query}, take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`,
  );

export default {
  getMobilizationExecution,
  getMobilizationExecutionById,
  getMobilizationExecutionForMemo,

  getMobilizationExecutionPagination,
  getMobilizationExecutionQueryPagination,
};

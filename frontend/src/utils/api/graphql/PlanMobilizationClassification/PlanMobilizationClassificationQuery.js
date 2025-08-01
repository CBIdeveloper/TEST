import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      planMobilizationClassifications ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          mobilizationClassificationSubject
          releaseDate
          mobilizationClassificationId
          mobilizationClassification {
            classificationName
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

const getMobilizationClassification = baseQuery(
  '(order: { releaseDate: DESC })',
);

const getMobilizationClassificationById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: { releaseDate: DESC })`);

const getMobilizationClassificationByClassificationId = (id) =>
  baseQuery(
    `(where: {mobilizationClassificationId: {eq: ${id}}}, order: { releaseDate: DESC })`,
  );

const getMobilizationClassificationForMemo = (date) =>
  baseQuery(
    `(where: {updatedAt: {gte: "${date}"}}, order: { releaseDate: DESC })`,
  );

const getMobilizationClassificationPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`);

const getMobilizationClassificationQueryPagination = ({ query, take, skip }) =>
  baseQuery(
    `(${query}, take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`,
  );

const getMobilizationClassificationByClassificationIdPagination = ({
  id,
  take,
  skip,
}) =>
  baseQuery(
    `(where: {mobilizationClassificationId: {eq: ${id}}}, take: ${take}, skip: ${skip})`,
  );

export default {
  getMobilizationClassification,
  getMobilizationClassificationById,
  getMobilizationClassificationByClassificationId,
  getMobilizationClassificationForMemo,

  getMobilizationClassificationPagination,
  getMobilizationClassificationQueryPagination,
  getMobilizationClassificationByClassificationIdPagination,
};

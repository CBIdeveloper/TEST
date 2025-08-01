import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      planMobilizationPrograms ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          mobilizationProgramSubject
          releaseDate
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

const getMobilizationProgram = baseQuery('(order: { releaseDate: DESC })');

const getMobilizationProgramById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: { releaseDate: DESC })`);

const getMobilizationProgramForMemo = (date) =>
  baseQuery(`(where: {updatedAt: {gte: "${date}"}}, order: { releaseDate: DESC })`);

const getMobilizationProgramPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`);

const getMobilizationProgramQueryPagination = ({ query, take, skip }) =>
  baseQuery(
    `(${query}, take: ${take}, skip: ${skip}, order: { releaseDate: DESC })`,
  );

export default {
  getMobilizationProgram,
  getMobilizationProgramById,
  getMobilizationProgramForMemo,

  getMobilizationProgramPagination,
  getMobilizationProgramQueryPagination,
};

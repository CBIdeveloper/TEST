import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      regulations ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          regulationName
          regulationUrl
          regulationType
          remark
          abandonAt
          abandonUserAccountId
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getRegulation = baseQuery('');

const getRegulationById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getRegulationByType = (type) =>
  baseQuery(`(where: {regulationType: {eq: "${type}"}})`);

const getRegulationPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getRegulationQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

const getRegulationByTypePagination = ({ type, take, skip }) =>
  baseQuery(`(
    where: {regulationType: {eq: "${type}"}},
    take: ${take}, skip: ${skip}
  )`);

export default {
  getRegulation,
  getRegulationById,
  getRegulationByType,

  getRegulationPagination,
  getRegulationQueryPagination,
  getRegulationByTypePagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      codefiles ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          codeId
          name
          heading
          parentCodeId
          sequenceNumber
          isExisted
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getCodefile = baseQuery('');

const getCodefileById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getCodefileByCodeId = (id) => baseQuery(`(where: {id: {eq: 001}} or {id: {eq: 002} or {id: {eq: 003}}})`)

const getCodefilePagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getCodefileQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getCodefile,
  getCodefileById,
  getCodefileByCodeId,
  getCodefilePagination,
  getCodefileQueryPagination,
};

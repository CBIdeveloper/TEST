import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frRadiationProtects ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          email
    
          companyName
          companyAddress
          companyCity
          companyTown
          companyVillage
          companyTel
    
          creDate
          protectionName
          quality
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrRadiationProtect = baseQuery('(order: {creDate: DESC})');

const getFrRadiationProtectById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrRadiationProtectPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrRadiationProtectQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrRadiationProtect,
  getFrRadiationProtectById,

  getFrRadiationProtectPagination,
  getFrRadiationProtectQueryPagination,
};

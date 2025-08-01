import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frChemicalProtects ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          title
          tel
    
          companyName
          companyAddress
          companyCity
          companyTown
          companyVillage
          companyTel
    
          creDate
          equipType
          equipName
          quality
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrChemicalProtect = baseQuery('(order: {creDate: DESC})');

const getFrChemicalProtectById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrChemicalProtectPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrChemicalProtectQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrChemicalProtect,
  getFrChemicalProtectById,

  getFrChemicalProtectPagination,
  getFrChemicalProtectQueryPagination,
};

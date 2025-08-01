import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frMajorindustries ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          tel
          deputyname
          deputytel
    
          companyName
          companyAddress
          companyCity
          companyTown
          companyVillage
          factoryUniteno
    
          factoryStatus
          factoryAddress
          factoryCity
          factoryTown
          factoryVillage
          factoryTel
          factoryNo
          factoryKind
          factoryType
          productName
    
          creDate
          militaryType
          militaryUnit
          factoryName
          militaryUniteno
          produceSystem
          produceProject
          materialName
          model
          unit
          quantity
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrMajorindustry = baseQuery('(order: {creDate: DESC})');

const getFrMajorindustryById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrMajorindustryPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrMajorindustryQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrMajorindustry,
  getFrMajorindustryById,

  getFrMajorindustryPagination,
  getFrMajorindustryQueryPagination,
};

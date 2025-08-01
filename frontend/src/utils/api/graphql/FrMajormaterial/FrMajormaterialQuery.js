import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frMajormaterials ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          birthdate
          pid
          gender
          abode
          abodeCity
          abodeTown
          abodeVillage
          tel
    
          factoryName
          factoryAddress
          factoryCity
          factoryTown
          factoryVillage
          factoryTel
          factoryNo
          factoryStatus

          suppliesType
          suppliesSort
          suppliesKind
          suppliesName
          supplyQuantity
          supplyStock
          supplyUnit
      
          creDate
          deputyname
          deputyid
          levyType
          levyUnit
          levyPlace
          levyCity
          levyTown
          levyVillage
          levyDate
          levySuppliestype
          levySuppliesname
          visaquantity
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrMajormaterial = baseQuery('(order: {creDate: DESC})');

const getFrMajormaterialById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrMajormaterialPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrMajormaterialQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrMajormaterial,
  getFrMajormaterialById,

  getFrMajormaterialPagination,
  getFrMajormaterialQueryPagination,
};

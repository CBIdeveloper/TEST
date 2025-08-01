import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frRfEquips ${condition} {
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
    
          approvalno
          approvaldate
          workFrequency
          useFrequency
          brand
          model
          itemtype
          supply_quantity
          supply_unit
          
          creDate
          deputyname
          deputyid
          levyApprovalno
          levyType
          levyUnit
          levyPlace
          levyCity
          levyTown
          levyVillage
          levyTime
          visaquantity
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrRfEquip = baseQuery('(order: {creDate: DESC})');

const getFrRfEquipById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrRfEquipPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrRfEquipQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrRfEquip,
  getFrRfEquipById,

  getFrRfEquipPagination,
  getFrRfEquipQueryPagination,
};

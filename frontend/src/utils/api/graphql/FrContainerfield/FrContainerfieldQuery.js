import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frContainerfields ${condition} {
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
          flightCenter
    
          containerfield
          storehouse
          basement
          space
          parking
          entranceWidth
          crane
          stacker
          tractor
          electromotor
          extinguisher
        
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
          levyFactory
          visaquantity
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrContainerfield = baseQuery('(order: {creDate: DESC})');

const getFrContainerfieldById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrContainerfieldPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrContainerfieldQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrContainerfield,
  getFrContainerfieldById,

  getFrContainerfieldPagination,
  getFrContainerfieldQueryPagination,
};

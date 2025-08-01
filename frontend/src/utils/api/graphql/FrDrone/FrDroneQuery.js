import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frDrones ${condition} {
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
          habitation
          habitatCity
          habitatTown
          habitatVillage
          abode
          abodeCity
          abodeTown
          abodeVillage
          tel
    
          companyName
          companyAddress
          companyCity
          companyTown
          companyVillage
          companyTel
        
          registerno
          structure
          brand
          model
          maxtakeoffweight
          size
          wingstyle
          powertype
          takeoffmethod
          remotemethod
          navigation
          maxspeed
    
          creDate
          deputyname
          deputyid
          levyType
          levyUnit
          levyPlace
          levyCity
          levyTown
          levyVillage
          levyTime
          levyRegisterno
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrDrone = baseQuery('(order: {creDate: DESC})');

const getFrDroneById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrDronePagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrDroneQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrDrone,
  getFrDroneById,

  getFrDronePagination,
  getFrDroneQueryPagination,
};

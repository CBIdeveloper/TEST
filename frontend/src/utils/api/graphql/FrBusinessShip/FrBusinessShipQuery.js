import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frBusinessShips ${condition} {
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
    
          companyName
          companyAddress
          companyCity
          companyTown
          companyVillage
          companyTel
          shipCenter
        
          shipType
          shipName
          shipno
          waterBusinessno
          shipMaterial
          totalweight
          maxPassenger
          maxWeight
          totallength
          shipLength
          shipWidth
          fullLoad
          maxspeed
          rate
        
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
          levyShiptype
          levyShipno
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrBusinessShip = baseQuery('(order: {creDate: DESC})');

const getFrBusinessShipById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrBusinessShipPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrBusinessShipQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrBusinessShip,
  getFrBusinessShipById,

  getFrBusinessShipPagination,
  getFrBusinessShipQueryPagination,
};

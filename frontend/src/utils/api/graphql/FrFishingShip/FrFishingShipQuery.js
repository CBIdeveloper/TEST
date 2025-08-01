import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frFishingShips ${condition} {
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
          uniteno
    
          shipType
          shipName
          shipMaterial
          totalweight
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
          levyUniteno
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrFishingShip = baseQuery('(order: {creDate: DESC})');

const getFrFishingShipById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrFishingShipPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrFishingShipQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrFishingShip,
  getFrFishingShipById,

  getFrFishingShipPagination,
  getFrFishingShipQueryPagination,
};

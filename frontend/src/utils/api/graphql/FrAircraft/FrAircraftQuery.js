import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frAircrafts ${condition} {
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
          aircraftregistration
          companyAddress
          companyCity
          companyTown
          companyVillage
          companyTel
        
          aircraftModel
          aircraftSeat
          aircraftMaxcargo
    
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
          aircraftModelno
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrAircraft = baseQuery('(order: {creDate: DESC})');

const getFrAircraftById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrAircraftPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrAircraftQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrAircraft,
  getFrAircraftById,

  getFrAircraftPagination,
  getFrAircraftQueryPagination,
};

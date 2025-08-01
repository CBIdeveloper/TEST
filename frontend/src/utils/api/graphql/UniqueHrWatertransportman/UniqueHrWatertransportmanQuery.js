import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrWatertransportmen ${condition} {
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
    
          manageType
          manageUnit
          managePlace
          manageCity
          manageTown
          manageVillage
    
          planType
          planTime
          planPlace
          planCity
          planTown
          planVillage
          levyUnit
    
          creDate
          skill
          lic
          unit
          unitAddress
          shipOrgan
          organTitle
          manualno
          manualDeadline
          shipno
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrWatertransportman = baseQuery('(order: {creDate: DESC})');

const getUniqueHrWatertransportmanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrWatertransportmanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrWatertransportmanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrWatertransportman,
  getUniqueHrWatertransportmanById,

  getUniqueHrWatertransportmanPagination,
  getUniqueHrWatertransportmanQueryPagination,
};

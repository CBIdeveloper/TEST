import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrWatertransportmen ${condition} {
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

const getHrWatertransportman = baseQuery('(order: {creDate: DESC})');

const getHrWatertransportmanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrWatertransportmanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrWatertransportmanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrWatertransportman,
  getHrWatertransportmanById,

  getHrWatertransportmanPagination,
  getHrWatertransportmanQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrMedicalmen ${condition} {
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
    
          creDate
          skill
          license
          specialty
          identityDist
          organType
          organTeam
          organTitle
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrMedicalman = baseQuery('(order: {creDate: DESC})');

const getHrMedicalmanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrMedicalmanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrMedicalmanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrMedicalman,
  getHrMedicalmanById,

  getHrMedicalmanPagination,
  getHrMedicalmanQueryPagination,
};

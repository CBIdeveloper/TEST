import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrFiremanpowers ${condition} {
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
          stationPlace
          stationCity
          stationTown
          stationVillage
    
          creDate
          organDist1
          organDist2
          organDist3
          organDist4
          organTitle
          lic
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrFiremanpower = baseQuery('(order: {creDate: DESC})');

const getHrFiremanpowerById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrFiremanpowerPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrFiremanpowerQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrFiremanpower,
  getHrFiremanpowerById,

  getHrFiremanpowerPagination,
  getHrFiremanpowerQueryPagination,
};

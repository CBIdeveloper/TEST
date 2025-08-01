import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrTrafficmanpowers ${condition} {
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
          organDist
          organTitle
          lic
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrTrafficmanpower = baseQuery('(order: {creDate: DESC})');

const getUniqueHrTrafficmanpowerById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrTrafficmanpowerPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrTrafficmanpowerQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrTrafficmanpower,
  getUniqueHrTrafficmanpowerById,

  getUniqueHrTrafficmanpowerPagination,
  getUniqueHrTrafficmanpowerQueryPagination,
};

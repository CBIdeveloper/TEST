import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrTrafficmanpowers ${condition} {
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

const getHrTrafficmanpower = baseQuery('(order: {creDate: DESC})');

const getHrTrafficmanpowerById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrTrafficmanpowerPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrTrafficmanpowerQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrTrafficmanpower,
  getHrTrafficmanpowerById,

  getHrTrafficmanpowerPagination,
  getHrTrafficmanpowerQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrCivildefensemanpowers ${condition} {
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
          organDist1
          organDist2
          organDist3
          organTitle
          ageDist
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrCivildefensemanpower = baseQuery('(order: {creDate: DESC})');

const getHrCivildefensemanpowerById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrCivildefensemanpowerPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrCivildefensemanpowerQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrCivildefensemanpower,
  getHrCivildefensemanpowerById,

  getHrCivildefensemanpowerPagination,
  getHrCivildefensemanpowerQueryPagination,
};

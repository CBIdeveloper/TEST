import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrFishermen ${condition} {
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
          uniteno
          shipname
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrFisherman = baseQuery('(order: {creDate: DESC})');

const getHrFishermanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrFishermanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrFishermanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrFisherman,
  getHrFishermanById,

  getHrFishermanPagination,
  getHrFishermanQueryPagination,
};

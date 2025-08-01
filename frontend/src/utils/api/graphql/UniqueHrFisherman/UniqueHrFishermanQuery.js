import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrFishermen ${condition} {
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

const getUniqueHrFisherman = baseQuery('(order: {creDate: DESC})');

const getUniqueHrFishermanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrFishermanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrFishermanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrFisherman,
  getUniqueHrFishermanById,

  getUniqueHrFishermanPagination,
  getUniqueHrFishermanQueryPagination,
};

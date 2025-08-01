import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrSubservicemen ${condition} {
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
          requireunit
          requnitPlace
          requnitCity
          requnitTown
          requnitVillage

    
          creDate
          skill
          enterdate
          retiredate
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrSubserviceman = baseQuery('(order: {creDate: DESC})');

const getUniqueHrSubservicemanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrSubservicemanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrSubservicemanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrSubserviceman,
  getUniqueHrSubservicemanById,

  getUniqueHrSubservicemanPagination,
  getUniqueHrSubservicemanQueryPagination,
};

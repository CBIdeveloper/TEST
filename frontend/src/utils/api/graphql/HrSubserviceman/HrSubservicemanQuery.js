import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrSubservicemen ${condition} {
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

const getHrSubserviceman = baseQuery('(order: {creDate: DESC})');

const getHrSubservicemanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrSubservicemanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrSubservicemanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrSubserviceman,
  getHrSubservicemanById,

  getHrSubservicemanPagination,
  getHrSubservicemanQueryPagination,
};

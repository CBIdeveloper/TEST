import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrCarRepairmen ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          age
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
          unit
          unitAddress
          lic
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrCarRepairman = baseQuery('(order: {creDate: DESC})');

const getUniqueHrCarRepairmanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrCarRepairmanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrCarRepairmanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrCarRepairman,
  getUniqueHrCarRepairmanById,

  getUniqueHrCarRepairmanPagination,
  getUniqueHrCarRepairmanQueryPagination,
};

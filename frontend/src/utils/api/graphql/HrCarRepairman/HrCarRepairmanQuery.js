import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrCarRepairmen ${condition} {
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

const getHrCarRepairman = baseQuery('(order: {creDate: DESC})');

const getHrCarRepairmanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrCarRepairmanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrCarRepairmanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrCarRepairman,
  getHrCarRepairmanById,

  getHrCarRepairmanPagination,
  getHrCarRepairmanQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrHeavymachinerydrivers ${condition} {
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
          unit
          lic
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrHeavymachinerydriver = baseQuery('(order: {creDate: DESC})');

const getUniqueHrHeavymachinerydriverById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrHeavymachinerydriverPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrHeavymachinerydriverQueryPagination = ({
  query,
  take,
  skip,
}) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrHeavymachinerydriver,
  getUniqueHrHeavymachinerydriverById,

  getUniqueHrHeavymachinerydriverPagination,
  getUniqueHrHeavymachinerydriverQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrAcDroneOperators ${condition} {
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
          operMenType
          lic
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrAcDroneOperator = baseQuery('(order: {creDate: DESC})');

const getUniqueHrAcDroneOperatorById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrAcDroneOperatorPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrAcDroneOperatorQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrAcDroneOperator,
  getUniqueHrAcDroneOperatorById,

  getUniqueHrAcDroneOperatorPagination,
  getUniqueHrAcDroneOperatorQueryPagination,
};

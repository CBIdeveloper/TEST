import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrAcDroneOperators ${condition} {
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

const getHrAcDroneOperator = baseQuery('(order: {creDate: DESC})');

const getHrAcDroneOperatorById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrAcDroneOperatorPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrAcDroneOperatorQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrAcDroneOperator,
  getHrAcDroneOperatorById,

  getHrAcDroneOperatorPagination,
  getHrAcDroneOperatorQueryPagination,
};

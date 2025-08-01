import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrRadiationmen ${condition} {
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
          licNumber
          expiryDate
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrRadiationman = baseQuery('(order: {creDate: DESC})');

const getHrRadiationmanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrRadiationmanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrRadiationmanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrRadiationman,
  getHrRadiationmanById,

  getHrRadiationmanPagination,
  getHrRadiationmanQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrVehicledrivers ${condition} {
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
          drvinglic
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrVehicledriver = baseQuery('(order: {creDate: DESC})');

const getUniqueHrVehicledriverById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrVehicledriverPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrVehicledriverQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrVehicledriver,
  getUniqueHrVehicledriverById,

  getUniqueHrVehicledriverPagination,
  getUniqueHrVehicledriverQueryPagination,
};

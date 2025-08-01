import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrVehicledrivers ${condition} {
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

const getHrVehicledriver = baseQuery('(order: {creDate: DESC})');

const getHrVehicledriverById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrVehicledriverPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrVehicledriverQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrVehicledriver,
  getHrVehicledriverById,

  getHrVehicledriverPagination,
  getHrVehicledriverQueryPagination,
};

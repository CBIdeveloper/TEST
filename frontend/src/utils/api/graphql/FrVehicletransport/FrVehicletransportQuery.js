import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frVehicletransports ${condition} {
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
          abode
          habitation
          abodeCity
          abodeTown
          abodeVillage
    
          tel
          manageUnit
    
          cartype
          carweight
          makedate
          checkdate
          yearlycheckstatus
    
          creDate

          deputyid
          levyType
          levyUnit
          levyPlace
          levyCity
          levyTown
          levyVillage
          levyTime
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrVehicletransport = baseQuery('(order: {creDate: DESC})');

const getFrVehicletransportById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrVehicletransportPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrVehicletransportQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrVehicletransport,
  getFrVehicletransportById,

  getFrVehicletransportPagination,
  getFrVehicletransportQueryPagination,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frDedicatedTelecoms ${condition} {
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
          abodeCity
          abodeTown
          abodeVillage
          habitation
          habitatCity
          habitatTown
          habitatVillage
          tel
    
          setupName
          setupAddress
          setupCity
          setupTown
          setupVillage
          setupPname
          setupPtel
    
          creDate
          eqType
          setQuantity
          levyEnergy
          frequency
          power
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrDedicatedTelecom = baseQuery('(order: {creDate: DESC})');

const getFrDedicatedTelecomById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrDedicatedTelecomPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrDedicatedTelecomQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrDedicatedTelecom,
  getFrDedicatedTelecomById,

  getFrDedicatedTelecomPagination,
  getFrDedicatedTelecomQueryPagination,
};

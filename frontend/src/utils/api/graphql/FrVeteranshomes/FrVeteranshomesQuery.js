import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frVeteranshomes ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          title
          tel
    
          orgName
          orgAddress
          orgCity
          orgTown
          orgVillage
          orgTel
    
          creDate
          regBedNo
          occNo
          occRate
          adjustBedNo
          wartmagBedNo
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrVeteranshomes = baseQuery('(order: {creDate: DESC})');

const getFrVeteranshomesById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrVeteranshomesPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrVeteranshomesQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrVeteranshomes,
  getFrVeteranshomesById,

  getFrVeteranshomesPagination,
  getFrVeteranshomesQueryPagination,
};

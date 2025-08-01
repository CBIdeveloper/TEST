import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frHeavymachineries ${condition} {
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
    
          tel
          companyName
          companyAddress
          companyCity
          companyTown
          companyVillage
          hmachineryCity
          hmachineryTown
          hmachineryVillage
    
          hmachineryType
          hmachineryMove
          hmachineryId
          hmachineryModel
          hmachineryAddress
    
          creDate
          deputyname
          deputyid
          levyType
          levyUnit
          levyPlace
          levyCity
          levyTown
          levyVillage
          levyTime
          levyModel
          visaquantity
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrHeavymachinery = baseQuery('(order: {creDate: DESC})');

const getFrHeavymachineryById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrHeavymachineryPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrHeavymachineryQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrHeavymachinery,
  getFrHeavymachineryById,

  getFrHeavymachineryPagination,
  getFrHeavymachineryQueryPagination,
};

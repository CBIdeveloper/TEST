import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frActivitycenters ${condition} {
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
    
          centerName
          centerAddress
          centerCity
          centerTown
          centerVillage
          centerTel
    
          hall
          basement
          grandstandseat
          parking
          space
          entranceWidth
          waterStorage
          electromotor
          extinguisher
    
          creDate
          deputyname
          deputyid
          activitycentreName
          levyType
          levyUnit
          levyPlace
          levyCity
          levyTown
          levyVillage
          levyDate
          visaquantity
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrActivitycenter = baseQuery('(order: {creDate: DESC})');

const getFrActivitycenterById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrActivitycenterPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrActivitycenterQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrActivitycenter,
  getFrActivitycenterById,

  getFrActivitycenterPagination,
  getFrActivitycenterQueryPagination,
};

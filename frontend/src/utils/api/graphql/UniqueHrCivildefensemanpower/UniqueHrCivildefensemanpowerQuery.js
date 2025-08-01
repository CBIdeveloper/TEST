import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrCivildefensemanpowers ${condition} {
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
          organDist1
          organDist2
          organDist3
          organTitle
          ageDist
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrCivildefensemanpower = baseQuery('(order: {creDate: DESC})');

const getUniqueHrCivildefensemanpowerById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrCivildefensemanpowerPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrCivildefensemanpowerQueryPagination = ({
  query,
  take,
  skip,
}) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrCivildefensemanpower,
  getUniqueHrCivildefensemanpowerById,

  getUniqueHrCivildefensemanpowerPagination,
  getUniqueHrCivildefensemanpowerQueryPagination,
};

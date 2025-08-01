import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrYouthserviceteams ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          birthdate
          age
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
          schoolcode
          schooltitle
          schooladdress
          schoolCity
          schoolTown
          schoolVillage
          school
    
          manageType
          manageUnit
          managePlace
          manageCity
          manageTown
          manageVillage
    
          creDate
          skill
          organTitle
          organLevel
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrYouthserviceteam = baseQuery('(order: {creDate: DESC})');

const getHrYouthserviceteamById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrYouthserviceteamPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrYouthserviceteamQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrYouthserviceteam,
  getHrYouthserviceteamById,

  getHrYouthserviceteamPagination,
  getHrYouthserviceteamQueryPagination,
};

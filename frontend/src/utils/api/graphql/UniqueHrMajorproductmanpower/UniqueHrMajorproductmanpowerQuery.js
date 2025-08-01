import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrMajorproductmanpowers ${condition} {
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
          factoryNo
          lic1
          licNo1
          lic2
          licNo2
          lic3
          licNo3
          lic4
          licNo4
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrMajorproductmanpower = baseQuery('(order: {creDate: DESC})');

const getUniqueHrMajorproductmanpowerById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrMajorproductmanpowerPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrMajorproductmanpowerQueryPagination = ({
  query,
  take,
  skip,
}) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrMajorproductmanpower,
  getUniqueHrMajorproductmanpowerById,

  getUniqueHrMajorproductmanpowerPagination,
  getUniqueHrMajorproductmanpowerQueryPagination,
};

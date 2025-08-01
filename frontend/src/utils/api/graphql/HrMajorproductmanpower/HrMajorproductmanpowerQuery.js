import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrMajorproductmanpowers ${condition} {
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

const getHrMajorproductmanpower = baseQuery('(order: {creDate: DESC})');

const getHrMajorproductmanpowerById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrMajorproductmanpowerPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrMajorproductmanpowerQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrMajorproductmanpower,
  getHrMajorproductmanpowerById,

  getHrMajorproductmanpowerPagination,
  getHrMajorproductmanpowerQueryPagination,
};

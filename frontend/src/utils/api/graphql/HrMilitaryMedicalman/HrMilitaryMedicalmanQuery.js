import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      hrMilitaryMedicalmen ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          pid
          militaryType
          militaryClass
          creDate
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getHrMilitaryMedicalman = baseQuery('(order: {creDate: DESC})');

const getHrMilitaryMedicalmanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getHrMilitaryMedicalmanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getHrMilitaryMedicalmanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getHrMilitaryMedicalman,
  getHrMilitaryMedicalmanById,

  getHrMilitaryMedicalmanPagination,
  getHrMilitaryMedicalmanQueryPagination,
};

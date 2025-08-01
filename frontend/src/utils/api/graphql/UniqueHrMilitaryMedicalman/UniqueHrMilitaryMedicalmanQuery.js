import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrMilitaryMedicalmen ${condition} {
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

const getUniqueHrMilitaryMedicalman = baseQuery('(order: {creDate: DESC})');

const getUniqueHrMilitaryMedicalmanById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrMilitaryMedicalmanPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrMilitaryMedicalmanQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrMilitaryMedicalman,
  getUniqueHrMilitaryMedicalmanById,

  getUniqueHrMilitaryMedicalmanPagination,
  getUniqueHrMilitaryMedicalmanQueryPagination,
};

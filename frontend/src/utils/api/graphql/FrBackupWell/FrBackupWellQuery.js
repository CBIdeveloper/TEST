import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frBackupWells ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          unitName
          unitAddress
          unitTel
    
          creDate
          backupwellName
          backupwellX
          backupwellY
          dailyWatersupply
          waterPopulation
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrBackupWell = baseQuery('(order: {creDate: DESC})');

const getFrBackupWellById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrBackupWellPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrBackupWellQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrBackupWell,
  getFrBackupWellById,

  getFrBackupWellPagination,
  getFrBackupWellQueryPagination,
};

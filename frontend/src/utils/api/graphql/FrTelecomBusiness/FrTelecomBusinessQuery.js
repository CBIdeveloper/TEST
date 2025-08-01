import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frTelecomBusinesses ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          contractorName
          companyAddress
          companyCity
          companyTown
          companyVillage
          name
          tel
          contractorName
          contractorTel
          agentName
          agentTel
          telecom_type
          radio_name
          radio_address          
          creDate
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrTelecomBusiness = baseQuery('(order: {creDate: DESC})');

const getFrTelecomBusinessById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrTelecomBusinessPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrTelecomBusinessQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrTelecomBusiness,
  getFrTelecomBusinessById,

  getFrTelecomBusinessPagination,
  getFrTelecomBusinessQueryPagination,
};

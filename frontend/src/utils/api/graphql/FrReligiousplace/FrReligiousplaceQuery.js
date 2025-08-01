import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frReligiousplaces ${condition} {
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
    
          religionName
          religionPlace
          religionCity
          religionTown
          religionVillage
          religionTel
    
          dormitory
          basement
          hall
          parking
          space
          entranceWidth
          waterwell
          watertower
          electromotor
          extinguisher
    
          creDate
          deputyname
          deputyid
          levyReligionname
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

const getFrReligiousplace = baseQuery('(order: {creDate: DESC})');

const getFrReligiousplaceById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrReligiousplacePagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrReligiousplaceQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrReligiousplace,
  getFrReligiousplaceById,

  getFrReligiousplacePagination,
  getFrReligiousplaceQueryPagination,
};

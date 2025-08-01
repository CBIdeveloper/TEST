import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frSchools ${condition} {
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
    
          schoolName
          schoolAddress
          schoolCity
          schoolTown
          schoolVillage
          schoolTel
    
          classroom
          activitycentre
          playground
          basement
          gateWidth
          entranceWidth
          waterwell
          watertower
          electromotor
          extinguisher
          tent
    
          creDate
          deputyname
          deputyid
          levySchoolname
          levyType
          levyUnit
          levyPlace
          levyCity
          levyTown
          levyVillage
          levyDate
          visaquantity
          levyFacilityType
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrSchool = baseQuery('(order: {creDate: DESC})');

const getFrSchoolById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrSchoolPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrSchoolQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrSchool,
  getFrSchoolById,

  getFrSchoolPagination,
  getFrSchoolQueryPagination,
};

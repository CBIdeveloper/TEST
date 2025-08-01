import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      simpleSysUserAccounts ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          email
          businessPhone
          cellphone
          jobPosition
          pid
          state
          userAccountAppliedStatus
          telephoneExtension
          agencyType
    
          firstlevelAgencyId
          firstlevelAgency {
            fullName
            shortName
          }
          secondaryAgencyId
          secondaryAgency {
            fullName
            shortName
          }
          department
    
          cityId
          city {
            cityName
            areaCode
          }
          braidingCategories {
            id
          }
          firstlevelUnitId
          firstlevelUnit {
            fullName
          }
          unitName
          
          createdAt
          levelId
          levelName
          militaryagencyId
          militaryagencyName
          secondlevelMilitaryagency
          maintainManufacturer
          workPlace
          isPlansponsor
          
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getSysUserAccount = baseQuery('');

const getSysUserAccountById = (id) => baseQuery(`(where: {id: {eq: ${id}}})`);

const getSysUserAccountByFirstLevelAgency = (id) =>
  baseQuery(
    `(where: { and: [{firstlevelAgencyId: {eq: ${id}}}, {or: [{state: {eq: "1"}}, {state: {eq: "2"}}]}]})`,
  );

const getSysUserAccountBySecondaryAgency = (id) =>
  baseQuery(
    `(where: { and: [{secondaryAgencyId: {eq: ${id}}}, {or: [{state: {eq: "1"}}, {state: {eq: "2"}}]}]})`,
  );

const getSysUserAccountByCity = (id) =>
  baseQuery(
    `(where: { and: [{cityId: {eq: ${id}}}, {or: [{state: {eq: "1"}}, {state: {eq: "2"}}]}]})`,
  );

const getSysUserAccountByFirstlevelUnit = (id) =>
  baseQuery(
    `(where: { and: [{firstlevelUnitId: {eq: ${id}}}, {or: [{state: {eq: "1"}}, {state: {eq: "2"}}]}]})`,
  );

const getSysUserAccountByMilitaryagency = (militaryagencyId) =>
  baseQuery(
    `(where: { and: [{militaryagencyId: {eq: "${militaryagencyId}"}}, {or: [{state: {eq: "1"}}, {state: {eq: "2"}}]}]})`,
  );

const getSysUserAccountByLevel = (levelId) =>
  baseQuery(
    `(where: { and: [{levelId: {eq: "${levelId}"}}, {or: [{state: {eq: "1"}}, {state: {eq: "2"}}]}]})`,
  );

const getSysUserAccountByPidAndName = ({ pid, name }) =>
  baseQuery(`(
    where: { and: [
      {pid: {eq: "${pid}"}}
      {name: {eq: "${name}"}}
    ]}
  )`);

const getSysUserAccountPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getSysUserAccountQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

const getSysUserAccountQueryPaginationWithOrder = ({ query, take, skip }) =>
  baseQuery(
    `(${query}, take: ${take}, skip: ${skip}, order: [{createdAt: DESC}])`,
  );

export default {
  getSysUserAccount,
  getSysUserAccountById,
  getSysUserAccountByFirstLevelAgency,
  getSysUserAccountBySecondaryAgency,
  getSysUserAccountByCity,
  getSysUserAccountByFirstlevelUnit,
  getSysUserAccountByMilitaryagency,
  getSysUserAccountByLevel,
  getSysUserAccountByPidAndName,

  getSysUserAccountPagination,
  getSysUserAccountQueryPagination,
  getSysUserAccountQueryPaginationWithOrder,
};

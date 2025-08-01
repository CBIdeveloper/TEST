import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      sysUserAccounts ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          name
          account
          agencyType
          businessNeeds
          businessPhone
          businessPlan
          cellphone
          email
          isPlansponsor
          jobPosition
          lineId
          pid
          remark
          pamacc
          ztacc
          splacc
          toacc
          roleMainId
          roleMain {
            ownedPermissionGroups {
              permissionGroupCode
            }
          }
          state
          userAccountAppliedStatus
          telephoneExtension
          appliedIpAddress
          mobilizationPlanId
    
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
          maintainManufacturer
          cityId
          city {
            cityName
            areaCode
          }
          firstlevelUnitId
          firstlevelUnit {
            fullName
          }
          unitName
          
          mobilizationType
          braidingCategories {
            id
            code
            fullName
            mobilizationClassificationId
            mobilizationClassification {
              classificationName
              mobilizationPlanId
            }
          }
          
          sysUserAccountAppliedAttachments {
            id
            uploadedFileName
          }
    
          createdAt
          reasonOfFailure
          levelId
          levelName
          militaryagencyId
          militaryagencyName
          secondlevelMilitaryagency
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
  baseQuery(`(where: {firstlevelAgencyId: {eq: ${id}}})`);

const getSysUserAccountBySecondaryAgency = (id) =>
  baseQuery(`(where: {secondaryAgencyId: {eq: ${id}}})`);

const getSysUserAccountByCity = (id) =>
  baseQuery(`(where: {cityId: {eq: ${id}}})`);

const getSysUserAccountByFirstlevelUnit = (id) =>
  baseQuery(`(where: {firstlevelUnitId: {eq: ${id}}})`);

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

const getExecutiveYuanUser = () =>
  baseQuery(`(
    where: {businessPlan: {eq: "1"}}
     order: [
      { isPlansponsor: DESC }
      { secondaryAgencyId: ASC }
      { firstlevelAgencyId: ASC }
      { name: ASC }
    ]
  )`);

const getPlanUser = (planId) =>
  baseQuery(`(
    where: { and: [
      {businessPlan: {in: ["2", "3"]}}
      {isPlansponsor: {eq: true}}
      {
        braidingCategories: {
          some: {
            mobilizationClassification: { mobilizationPlanId: { eq: ${planId} } }
          }
        }
      }
    ]}
     order: [
      {businessPlan: ASC}
      {secondaryAgencyId: ASC}
      {firstlevelAgency: {shortName: ASC}}
      {secondaryAgency: {shortName: ASC}}
      {name: ASC}
    ]
  )`);

const getLocalGovernmentUser = () =>
  baseQuery(`(
    where: {businessPlan: {eq: "5"}}
    order: [
      {cityId: ASC}
      {firstlevelUnit: {fullName: ASC}}
      {name: ASC}
    ]
  )`);

export default {
  getSysUserAccount,
  getSysUserAccountById,
  getSysUserAccountByFirstLevelAgency,
  getSysUserAccountBySecondaryAgency,
  getSysUserAccountByCity,
  getSysUserAccountByFirstlevelUnit,
  getSysUserAccountByPidAndName,

  getSysUserAccountPagination,
  getSysUserAccountQueryPagination,
  getSysUserAccountQueryPaginationWithOrder,

  getExecutiveYuanUser,
  getPlanUser,
  getLocalGovernmentUser,
};

import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      businessManagementTests ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          title
          content
          announcedUserAccountId
          announcedUserAccount {
            name
          }
          announcedUserAccountJobPosition
          announcedUserAccountBusinessPhone
          announcedUserAccountTelephoneExtension
          announcementDate
          attachmentDeadlineDate
          businessManagementTestType
          businessManagementTestAttachments {
            id
            uploadedFileName
            createdUserAccountId
          }
          businessManagementTestRespondedAttachments {
            id
            uploadedFileName
            createdUserAccountId
            createdUserAccount {
              name
              jobPosition
            }
            uploadedAgencyType
            uploadedFirstlevelAgency {
              shortName
            }
            uploadedSecondaryAgency {
              shortName
            }
            uploadedFirstlevelUnit {
              fullName
            }
            uploadedMaintainManufacturer
          }
          createdAt
          createdUserAccountId
          createdUserAccount {
            name
          }
          announcedUserAccountAgencyType
          announcedUserAccountFirstlevelAgencyId
          announcedUserAccountFirstlevelAgency {
            fullName
            shortName
          }
          announcedUserAccountSecondaryAgencyId
          announcedUserAccountSecondaryAgency {
            fullName
            shortName
            firstlevelAgencyId
          }
          announcedUserAccountFirstlevelUnitId
          announcedUserAccountFirstlevelUnit {
            cityId
            fullName
          }
          announcedUserAccountMaintainManufacturer
          announcedUserAccountMilitaryagencyId
          announcedUserAccountMilitaryagency {
            name
          }
          announcedUnit
          firstlevelAgencies {
            id
            fullName
            shortName
          }
          firstlevelUnits {
            id
            fullName
            cityId
          }
          secondaryAgencies {
            id
            firstlevelAgencyId
            fullName
            shortName
          }
          isRespondedAttatchmentRequired
          isVisibleToAll
          isOrganizationClear
          isGovernmentClear
          isMilitaryClear
          cities {
            id
            cityName
          }
          levels {
            codeId
            name
          }
          militaryAgencies {
            codeId
            name
          }
          isSign
          isFood
          isPlace
          isTraffic
          isMeetingTimeRequired
          meetingPeople
          meetingType
          meetingTypeName
          meetingStartDate
          meetingEndDate
          meetingDeadlineDate
          meetingPlace
          signState
          topicList {
            id
            researchTopic
            effect
          }
          requestList {
            questionType
            isRequired
            question
            option
          }
          businessManagementTestSigns {
            id
            unit
          }
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getBusinessManagement = baseQuery('');

const getBusinessManagementById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}})`);

const getBusinessManagementByType = (type) =>
  baseQuery(`(where: {businessManagementTestType: {eq: ${type}}})`);

const getBusinessManagementByTypeAndFirstAgency = ({ type, id }) =>
  baseQuery(`(
    where: {
      and: [
        {businessManagementTestType: {eq: ${type} }}
        {or: [
          {firstlevelAgencies: {some: {id: {eq: ${id} }}}}      
          {isVisibleToAll: {eq: true}}
        ]}
      ]
    } 
  )`);

const getBusinessManagementByTypeAndSecondaryAgency = ({ type, id }) =>
  baseQuery(`(
    where: {
      and: [
        {businessManagementTestType: {eq: ${type} }}
        {or: [
          {secondaryAgencies: {some: {id: {eq: ${id} }}}}      
          {isVisibleToAll: {eq: true}}
        ]}
      ]
    } 
  )`);

const getBusinessManagementByTypeAndUnit = ({ type, id }) =>
  baseQuery(`(
    where: {
      and: [
        {businessManagementTestType: {eq: ${type} }}
        {or: [
          {firstlevelUnits: {some: {id: {eq: ${id} }}}}      
          {isVisibleToAll: {eq: true}}
        ]}
      ]
    } 
  )`);

const getBusinessManagementPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip})`);

const getBusinessManagementQuery = ({ query }) =>
  baseQuery(`(${query})`);

const getBusinessManagementQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

const getBusinessManagementByTypeAndFirstAgencyPagination = ({
  type,
  id,
  take,
  skip,
}) =>
  baseQuery(`(
    where: {
      and: [
        {businessManagementTestType: {eq: ${type} }}
        {or: [
          {firstlevelAgencies: {some: {id: {eq: ${id} }}}}      
          {isVisibleToAll: {eq: true}}
        ]}
      ]
    },
    take: ${take}, skip: ${skip}
  )`);

const getBusinessManagementByTypeAndSecondaryAgencyPagination = ({
  type,
  id,
  take,
  skip,
}) =>
  baseQuery(`(
    where: {
      and: [
        {businessManagementTestType: {eq: ${type} }}
        {or: [
          {secondaryAgencies: {some: {id: {eq: ${id} }}}}      
          {isVisibleToAll: {eq: true}}
        ]}
      ]
    },
    take: ${take}, skip: ${skip}
  )`);

const getBusinessManagementByTypeAndUnitPagination = ({
  type,
  id,
  take,
  skip,
}) =>
  baseQuery(`(
    where: {
      and: [
        {businessManagementTestType: {eq: ${type} }}
        {or: [
          {firstlevelUnits: {some: {id: {eq: ${id} }}}}      
          {isVisibleToAll: {eq: true}}
        ]}
      ]
    },
    take: ${take}, skip: ${skip}
  )`);

export default {
  getBusinessManagement,
  getBusinessManagementById,
  getBusinessManagementByType,
  getBusinessManagementByTypeAndFirstAgency,
  getBusinessManagementByTypeAndSecondaryAgency,
  getBusinessManagementByTypeAndUnit,

  getBusinessManagementPagination,
  getBusinessManagementQuery,
  getBusinessManagementQueryPagination,
  getBusinessManagementByTypeAndFirstAgencyPagination,
  getBusinessManagementByTypeAndSecondaryAgencyPagination,
  getBusinessManagementByTypeAndUnitPagination,
};

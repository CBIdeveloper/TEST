import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      simpleSysUserAccountContacts ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          state
          name
          email
          businessPhone
          businessPlan
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
          
          firstlevelUnitId
          firstlevelUnit {
            fullName
          }
          unitName
          mobilizationPlanId
          createdAt
          levelId
          levelName
          militaryagencyId
          militaryagencyName
          secondlevelMilitaryagency
          maintainManufacturer
          workPlace
          isPlansponsor
          braidingCategories {
            id
            fullName
            mobilizationClassificationId
            mobilizationClassification {
              classificationName
              mobilizationPlanId
            }
          }
          mobilizationPlanText
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getSysUserAccountContactQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip})`);

export default {
  getSysUserAccountContactQueryPagination,
};

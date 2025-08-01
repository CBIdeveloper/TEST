import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      uniqueHrReservists ${condition} {
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
          habitation
          habitatCity
          habitatTown
          habitatVillage
    
          manageAvailable
          manageType
          manageUnit
          managePlace
          manageCity
          manageTown
          manageVillage
    
          planType
          planUnit
          planTime
          planDay
          planPlace
          planCity
          planTown
          planVillage
    
          creDate
          mainCity
          militaryType
          militaryClass
          serviceType
          unavailableCondition
          unavailableElement
          callTimes
          callDays
          retireDate
          skillMain
          skill1
          skill2
          skill3
          skillCivil
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getUniqueHrReservist = baseQuery('(order: {creDate: DESC})');

const getUniqueHrReservistById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getUniqueHrReservistPagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getUniqueHrReservistQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getUniqueHrReservist,
  getUniqueHrReservistById,

  getUniqueHrReservistPagination,
  getUniqueHrReservistQueryPagination,
};

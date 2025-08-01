import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frMedicines ${condition} {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        items {
          id
          hospitalName
          hospitalAddress
          hospitalCity
          hospitalTown
          hospitalVillage
          hospitalLevel
    
          requirementType
          itemsType
          items
          unit
          manageQuality
          informQuality
          informDate
    
          creDate
          levyHospital
          levyType
          levyUnit
          levyPlace
          levyCity
          levyTown
          levyVillage
          levyDate
          visitems
          visaquantity
        }
      }
    }
  `;
  // console.log(query);
  return gql(query);
};

const getFrMedicine = baseQuery('(order: {creDate: DESC})');

const getFrMedicineById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrMedicinePagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrMedicineQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrMedicine,
  getFrMedicineById,

  getFrMedicinePagination,
  getFrMedicineQueryPagination,
};

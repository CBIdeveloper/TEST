import { gql } from '@apollo/client';

const baseQuery = (condition) => {
  const query = `
    query {
      frStorehouses ${condition} {
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
    
          storehouseAddress
          storehouseCity
          storehouseTown
          storehouseVillage
          storehouseTel
    
          storehouseName
          storehouseArea
          storehouseVolume
          freezingFacility
          basement
          space
          entranceWidth
          crane
          stacker
          electromotor
          extinguisher
    
          creDate
          deputyname
          deputyid
          levyStorehousename
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

const getFrStorehouse = baseQuery('(order: {creDate: DESC})');

const getFrStorehouseById = (id) =>
  baseQuery(`(where: {id: {eq: ${id}}}, order: {creDate: DESC})`);

const getFrStorehousePagination = ({ take, skip }) =>
  baseQuery(`(take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

const getFrStorehouseQueryPagination = ({ query, take, skip }) =>
  baseQuery(`(${query}, take: ${take}, skip: ${skip}, order: {creDate: DESC})`);

export default {
  getFrStorehouse,
  getFrStorehouseById,

  getFrStorehousePagination,
  getFrStorehouseQueryPagination,
};

import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import { getRequest, postRequest, putRequest } from '../../axios/axiosMethod';

import FirstlevelUnitQuery from '../../graphql/FirstlevelUnit/FirstlevelUnitQuery';
import FirstlevelUnitResponse from '../../../dataModels/FirstlevelUnit/FirstlevelUnitResponse';
import FirstlevelUnitListResponse from '../../../dataModels/FirstlevelUnit/FirstlevelUnitListResponse';

const readFirstlevelUnit = () =>
  apolloInstance
    .query({
      query: FirstlevelUnitQuery.getFirstlevelUnit,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.firstlevelUnits.items.map(
        (item) => new FirstlevelUnitResponse(item),
      );
    });

const readFirstlevelUnitById = (id) =>
  apolloInstance
    .query({
      query: FirstlevelUnitQuery.getFirstlevelUnitById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FirstlevelUnitResponse(data.firstlevelUnits.items[0]);
    });

const readFirstlevelUnitByCityId = (cityId) =>
  apolloInstance
    .query({
      query: FirstlevelUnitQuery.getFirstlevelUnitByCityId(cityId),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.firstlevelUnits.items.map(
        (item) => new FirstlevelUnitResponse(item),
      );
    });

const createFirstlevelUnit = (body) =>
  postRequest(Router.createFirstlevelUnit, body).then((response) => response);

const updateFirstlevelUnit = (id, body) =>
  putRequest(Router.updateFirstlevelUnit(id), body).then(
    (response) => response,
  );

const getFirstlevelUnitList = () =>
  getRequest(Router.getFirstlevelUnitList).then(
    (response) => new FirstlevelUnitListResponse(response.data),
  );

export default {
  readFirstlevelUnit,
  readFirstlevelUnitById,
  readFirstlevelUnitByCityId,

  createFirstlevelUnit,
  updateFirstlevelUnit,
  getFirstlevelUnitList,
};

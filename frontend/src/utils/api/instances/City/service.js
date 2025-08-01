import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import { getRequest, postRequest, putRequest } from '../../axios/axiosMethod';

import CityQuery from '../../graphql/City/CityQuery';
import CityResponse from '../../../dataModels/City/CityResponse';
import CityListResponse from '../../../dataModels/City/CityListResponse';

const readCity = () =>
  apolloInstance
    .query({
      query: CityQuery.getCity,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.cities.items.map((item) => new CityResponse(item));
    });

const readCityById = (id) =>
  apolloInstance
    .query({
      query: CityQuery.getCityById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new CityResponse(data.cities.items[0]);
    });

const readCityByAreaCode = (code) =>
  apolloInstance
    .query({
      query: CityQuery.getCityByAreaCode(code),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.cities.items.map((item) => new CityResponse(item));
    });

const createCity = (body) =>
  postRequest(Router.createCity, body).then((response) => response);

const updateCity = (id, body) =>
  putRequest(Router.updateCity(id), body).then((response) => response);

const getCityList = () =>
  getRequest(Router.getCityList).then(
    (response) => new CityListResponse(response.data),
  );

export default {
  readCity,
  readCityById,
  readCityByAreaCode,

  createCity,
  updateCity,
  getCityList,
};

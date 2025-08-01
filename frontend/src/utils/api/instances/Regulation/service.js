import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import RegulationQuery from '../../graphql/Regulation/RegulationQuery';
import RegulationResponse from '../../../dataModels/Regulation/RegulationResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readRegulation = () =>
  apolloInstance
    .query({
      query: RegulationQuery.getRegulation,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.regulations.items.map((item) => new RegulationResponse(item));
    });

const readRegulationById = (id) =>
  apolloInstance
    .query({
      query: RegulationQuery.getRegulationById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new RegulationResponse(data.regulations.items[0]);
    });

const readRegulationByType = (type) =>
  apolloInstance
    .query({
      query: RegulationQuery.getRegulationByType(type),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.regulations.items.map((item) => new RegulationResponse(item));
    });

const readRegulationPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: RegulationQuery.getRegulationPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.regulations.items.map(
        (item) => new RegulationResponse(item),
      );
      return new PaginationResponse({
        ...data.regulations,
        items,
      });
    });

const readRegulationQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: RegulationQuery.getRegulationQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.regulations.items.map(
        (item) => new RegulationResponse(item),
      );
      return new PaginationResponse({
        ...data.regulations,
        items,
      });
    });

const readRegulationByTypePagination = ({ type, take, skip }) =>
  apolloInstance
    .query({
      query: RegulationQuery.getRegulationByTypePagination({
        type,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.regulations.items.map(
        (item) => new RegulationResponse(item),
      );
      return new PaginationResponse({
        ...data.regulations,
        items,
      });
    });

const createRegulation = (body) =>
  postRequest(Router.createRegulation, body).then((response) => response);

const updateRegulation = (id, body) =>
  putRequest(Router.updateRegulation(id), body).then((response) => response);

const abandonRegulation = (id) =>
  putRequest(Router.abandonRegulation(id), {}).then((response) => response);

const deleteRegulation = (id) =>
  deleteRequest(Router.deleteRegulation(id)).then((response) => response);

export default {
  readRegulation,
  readRegulationById,
  readRegulationByType,

  readRegulationPagination,
  readRegulationQueryPagination,
  readRegulationByTypePagination,

  createRegulation,
  updateRegulation,
  abandonRegulation,
  deleteRegulation,
};

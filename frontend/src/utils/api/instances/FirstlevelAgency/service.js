import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import FirstlevelAgencyQuery from '../../graphql/FirstlevelAgency/FirstlevelAgencyQuery';
import FirstlevelAgencyResponse from '../../../dataModels/FirstlevelAgency/FirstlevelAgencyResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import FirstlevelAgencyListResponse from '../../../dataModels/FirstlevelAgency/FirstlevelAgencyListResponse';

const readFirstlevelAgency = () =>
  apolloInstance
    .query({
      query: FirstlevelAgencyQuery.getFirstlevelAgency,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.firstlevelAgencies.items.map(
        (item) => new FirstlevelAgencyResponse(item),
      );
    });

const readFirstlevelAgencyById = (id) =>
  apolloInstance
    .query({
      query: FirstlevelAgencyQuery.getFirstlevelAgencyById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FirstlevelAgencyResponse(data.firstlevelAgencies.items[0]);
    });

const readFirstlevelAgencyPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FirstlevelAgencyQuery.getFirstlevelAgencyPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.firstlevelAgencies.items.map(
        (item) => new FirstlevelAgencyResponse(item),
      );
      return new PaginationResponse({
        ...data.firstlevelAgencies,
        items,
      });
    });

const readFirstlevelAgencyQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FirstlevelAgencyQuery.getFirstlevelAgencyQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.firstlevelAgencies.items.map(
        (item) => new FirstlevelAgencyResponse(item),
      );
      return new PaginationResponse({
        ...data.firstlevelAgencies,
        items,
      });
    });

const createFirstlevelAgency = (body) =>
  postRequest(Router.createFirstlevelAgency, body).then((response) => response);

const updateFirstlevelAgency = (id, body) =>
  putRequest(Router.updateFirstlevelAgency(id), body).then(
    (response) => response,
  );

const deleteFirstlevelAgency = (id) =>
  deleteRequest(Router.deleteFirstlevelAgency(id)).then((response) => response);

const getFirstlevelAgencyList = () =>
  getRequest(Router.getFirstlevelAgencyList).then(
    (response) => new FirstlevelAgencyListResponse(response.data),
  );

export default {
  readFirstlevelAgency,
  readFirstlevelAgencyById,
  readFirstlevelAgencyPagination,
  readFirstlevelAgencyQueryPagination,

  createFirstlevelAgency,
  updateFirstlevelAgency,
  deleteFirstlevelAgency,
  getFirstlevelAgencyList,
};

import Router from './router';
import apolloInstance from '../../apollo/apolloInstance';
import {
  deleteRequest, getRequest,
  postRequest,
  putRequest,
} from '../../axios/axiosMethod';

import SecondaryAgencyQuery from '../../graphql/SecondaryAgency/SecondaryAgencyQuery';
import SecondaryAgencyResponse from '../../../dataModels/SecondaryAgency/SecondaryAgencyResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import SecondaryAgencyListResponse from '../../../dataModels/SecondaryAgency/SecondaryAgencyListResponse';

const readSecondaryAgency = () =>
  apolloInstance
    .query({
      query: SecondaryAgencyQuery.getSecondaryAgency,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.secondaryAgencies.items.map(
        (item) => new SecondaryAgencyResponse(item),
      );
    });

const readSecondaryAgencyById = (id) =>
  apolloInstance
    .query({
      query: SecondaryAgencyQuery.getSecondaryAgencyById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new SecondaryAgencyResponse(data.secondaryAgencies.items[0]);
    });

const readSecondaryAgencyByFirstLevelId = (id) =>
  apolloInstance
    .query({
      query: SecondaryAgencyQuery.getSecondaryAgencyByFirstLevelId(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.secondaryAgencies.items.map(
        (item) => new SecondaryAgencyResponse(item),
      );
    });

const readSecondaryAgencyPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: SecondaryAgencyQuery.getSecondaryAgencyPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.secondaryAgencies.items.map(
        (item) => new SecondaryAgencyResponse(item),
      );
      return new PaginationResponse({
        ...data.secondaryAgencies,
        items,
      });
    });

const readSecondaryAgencyQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: SecondaryAgencyQuery.getSecondaryAgencyQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.secondaryAgencies.items.map(
        (item) => new SecondaryAgencyResponse(item),
      );
      return new PaginationResponse({
        ...data.secondaryAgencies,
        items,
      });
    });

const createSecondaryAgency = (body) =>
  postRequest(Router.createSecondaryAgency, body).then((response) => response);

const updateSecondaryAgency = (id, body) =>
  putRequest(Router.updateSecondaryAgency(id), body).then(
    (response) => response,
  );

const deleteSecondaryAgency = (id) =>
  deleteRequest(Router.updateSecondaryAgency(id)).then((response) => response);

const getSecondaryAgencyList = () =>
  getRequest(Router.getSecondaryAgencyList).then(
    (response) => new SecondaryAgencyListResponse(response.data),
  );

export default {
  readSecondaryAgency,
  readSecondaryAgencyById,
  readSecondaryAgencyByFirstLevelId,

  readSecondaryAgencyPagination,
  readSecondaryAgencyQueryPagination,

  createSecondaryAgency,
  updateSecondaryAgency,
  deleteSecondaryAgency,
  getSecondaryAgencyList,
};

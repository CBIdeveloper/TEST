import apolloInstance from '../../apollo/apolloInstance';

import HrFiremanpowerQuery from '../../graphql/HrFiremanpower/HrFiremanpowerQuery';
import HrFiremanpowerResponse from '../../../dataModels/HrFiremanpower/HrFiremanpowerResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrFiremanpowerQuery from '../../graphql/UniqueHrFiremanpower/UniqueHrFiremanpowerQuery';

const readHrFiremanpower = () =>
  apolloInstance
    .query({
      query: HrFiremanpowerQuery.getHrFiremanpower,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrFiremanpowers.items.map(
        (item) => new HrFiremanpowerResponse(item),
      );
    });

const readHrFiremanpowerById = (id) =>
  apolloInstance
    .query({
      query: HrFiremanpowerQuery.getHrFiremanpowerById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrFiremanpowerResponse(data.hrFiremanpowers.items[0]);
    });

const readHrFiremanpowerPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrFiremanpowerQuery.getHrFiremanpowerPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrFiremanpowers.items.map(
        (item) => new HrFiremanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.hrFiremanpowers,
        items,
      });
    });

const readHrFiremanpowerQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrFiremanpowerQuery.getHrFiremanpowerQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrFiremanpowers.items.map(
        (item) => new HrFiremanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.hrFiremanpowers,
        items,
      });
    });

const readUniqueHrFiremanpower = () =>
  apolloInstance
    .query({
      query: UniqueHrFiremanpowerQuery.getUniqueHrFiremanpower,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrFiremanpowers.items.map(
        (item) => new HrFiremanpowerResponse(item),
      );
    });

const readUniqueHrFiremanpowerById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrFiremanpowerQuery.getUniqueHrFiremanpowerById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrFiremanpowerResponse(data.uniqueHrFiremanpowers.items[0]);
    });

const readUniqueHrFiremanpowerPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrFiremanpowerQuery.getUniqueHrFiremanpowerPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrFiremanpowers.items.map(
        (item) => new HrFiremanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrFiremanpowers,
        items,
      });
    });

const readUniqueHrFiremanpowerQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrFiremanpowerQuery.getUniqueHrFiremanpowerQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrFiremanpowers.items.map(
        (item) => new HrFiremanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrFiremanpowers,
        items,
      });
    });

export default {
  readHrFiremanpower,
  readHrFiremanpowerById,

  readHrFiremanpowerPagination,
  readHrFiremanpowerQueryPagination,

  readUniqueHrFiremanpower,
  readUniqueHrFiremanpowerById,

  readUniqueHrFiremanpowerPagination,
  readUniqueHrFiremanpowerQueryPagination,
};

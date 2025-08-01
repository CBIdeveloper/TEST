import apolloInstance from '../../apollo/apolloInstance';

import HrTrafficmanpowerQuery from '../../graphql/HrTrafficmanpower/HrTrafficmanpowerQuery';
import HrTrafficmanpowerResponse from '../../../dataModels/HrTrafficmanpower/HrTrafficmanpowerResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrTrafficmanpowerQuery from '../../graphql/UniqueHrTrafficmanpower/UniqueHrTrafficmanpowerQuery';

const readHrTrafficmanpower = () =>
  apolloInstance
    .query({
      query: HrTrafficmanpowerQuery.getHrTrafficmanpower,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrTrafficmanpowers.items.map(
        (item) => new HrTrafficmanpowerResponse(item),
      );
    });

const readHrTrafficmanpowerById = (id) =>
  apolloInstance
    .query({
      query: HrTrafficmanpowerQuery.getHrTrafficmanpowerById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrTrafficmanpowerResponse(data.hrTrafficmanpowers.items[0]);
    });

const readHrTrafficmanpowerPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrTrafficmanpowerQuery.getHrTrafficmanpowerPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrTrafficmanpowers.items.map(
        (item) => new HrTrafficmanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.hrTrafficmanpowers,
        items,
      });
    });

const readHrTrafficmanpowerQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrTrafficmanpowerQuery.getHrTrafficmanpowerQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrTrafficmanpowers.items.map(
        (item) => new HrTrafficmanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.hrTrafficmanpowers,
        items,
      });
    });

const readUniqueHrTrafficmanpower = () =>
  apolloInstance
    .query({
      query: UniqueHrTrafficmanpowerQuery.getUniqueHrTrafficmanpower,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrTrafficmanpowers.items.map(
        (item) => new HrTrafficmanpowerResponse(item),
      );
    });

const readUniqueHrTrafficmanpowerById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrTrafficmanpowerQuery.getUniqueHrTrafficmanpowerById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrTrafficmanpowerResponse(
        data.uniqueHrTrafficmanpowers.items[0],
      );
    });

const readUniqueHrTrafficmanpowerPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrTrafficmanpowerQuery.getUniqueHrTrafficmanpowerPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrTrafficmanpowers.items.map(
        (item) => new HrTrafficmanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrTrafficmanpowers,
        items,
      });
    });

const readUniqueHrTrafficmanpowerQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrTrafficmanpowerQuery.getUniqueHrTrafficmanpowerQueryPagination({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrTrafficmanpowers.items.map(
        (item) => new HrTrafficmanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrTrafficmanpowers,
        items,
      });
    });

export default {
  readHrTrafficmanpower,
  readHrTrafficmanpowerById,

  readHrTrafficmanpowerPagination,
  readHrTrafficmanpowerQueryPagination,

  readUniqueHrTrafficmanpower,
  readUniqueHrTrafficmanpowerById,

  readUniqueHrTrafficmanpowerPagination,
  readUniqueHrTrafficmanpowerQueryPagination,
};

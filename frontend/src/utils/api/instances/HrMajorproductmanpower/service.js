import apolloInstance from '../../apollo/apolloInstance';

import HrMajorproductmanpowerQuery from '../../graphql/HrMajorproductmanpower/HrMajorproductmanpowerQuery';
import HrMajorproductmanpowerResponse from '../../../dataModels/HrMajorproductmanpower/HrMajorproductmanpowerResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrMajorproductmanpowerQuery from '../../graphql/UniqueHrMajorproductmanpower/UniqueHrMajorproductmanpowerQuery';

const readHrMajorproductmanpower = () =>
  apolloInstance
    .query({
      query: HrMajorproductmanpowerQuery.getHrMajorproductmanpower,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrMajorproductmanpowers.items.map(
        (item) => new HrMajorproductmanpowerResponse(item),
      );
    });

const readHrMajorproductmanpowerById = (id) =>
  apolloInstance
    .query({
      query: HrMajorproductmanpowerQuery.getHrMajorproductmanpowerById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrMajorproductmanpowerResponse(
        data.hrMajorproductmanpowers.items[0],
      );
    });

const readHrMajorproductmanpowerPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrMajorproductmanpowerQuery.getHrMajorproductmanpowerPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMajorproductmanpowers.items.map(
        (item) => new HrMajorproductmanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMajorproductmanpowers,
        items,
      });
    });

const readHrMajorproductmanpowerQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        HrMajorproductmanpowerQuery.getHrMajorproductmanpowerQueryPagination({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMajorproductmanpowers.items.map(
        (item) => new HrMajorproductmanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMajorproductmanpowers,
        items,
      });
    });

const readUniqueHrMajorproductmanpower = () =>
  apolloInstance
    .query({
      query: UniqueHrMajorproductmanpowerQuery.getUniqueHrMajorproductmanpower,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrMajorproductmanpowers.items.map(
        (item) => new HrMajorproductmanpowerResponse(item),
      );
    });

const readUniqueHrMajorproductmanpowerById = (id) =>
  apolloInstance
    .query({
      query:
        UniqueHrMajorproductmanpowerQuery.getUniqueHrMajorproductmanpowerById(
          id,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrMajorproductmanpowerResponse(
        data.uniqueHrMajorproductmanpowers.items[0],
      );
    });

const readUniqueHrMajorproductmanpowerPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrMajorproductmanpowerQuery.getUniqueHrMajorproductmanpowerPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrMajorproductmanpowers.items.map(
        (item) => new HrMajorproductmanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrMajorproductmanpowers,
        items,
      });
    });

const readUniqueHrMajorproductmanpowerQueryPagination = ({
  query,
  take,
  skip,
}) =>
  apolloInstance
    .query({
      query:
        UniqueHrMajorproductmanpowerQuery.getUniqueHrMajorproductmanpowerQueryPagination(
          {
            query,
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrMajorproductmanpowers.items.map(
        (item) => new HrMajorproductmanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrMajorproductmanpowers,
        items,
      });
    });

export default {
  readHrMajorproductmanpower,
  readHrMajorproductmanpowerById,

  readHrMajorproductmanpowerPagination,
  readHrMajorproductmanpowerQueryPagination,

  readUniqueHrMajorproductmanpower,
  readUniqueHrMajorproductmanpowerById,

  readUniqueHrMajorproductmanpowerPagination,
  readUniqueHrMajorproductmanpowerQueryPagination,
};

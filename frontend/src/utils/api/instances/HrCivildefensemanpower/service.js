import apolloInstance from '../../apollo/apolloInstance';

import HrCivildefensemanpowerQuery from '../../graphql/HrCivildefensemanpower/HrCivildefensemanpowerQuery';
import HrCivildefensemanpowerResponse from '../../../dataModels/HrCivildefensemanpower/HrCivildefensemanpowerResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrCivildefensemanpowerQuery from '../../graphql/UniqueHrCivildefensemanpower/UniqueHrCivildefensemanpowerQuery';

const readHrCivildefensemanpower = () =>
  apolloInstance
    .query({
      query: HrCivildefensemanpowerQuery.getHrCivildefensemanpower,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrCivildefensemanpowers.items.map(
        (item) => new HrCivildefensemanpowerResponse(item),
      );
    });

const readHrCivildefensemanpowerById = (id) =>
  apolloInstance
    .query({
      query: HrCivildefensemanpowerQuery.getHrCivildefensemanpowerById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrCivildefensemanpowerResponse(
        data.hrCivildefensemanpowers.items[0],
      );
    });

const readHrCivildefensemanpowerPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrCivildefensemanpowerQuery.getHrCivildefensemanpowerPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrCivildefensemanpowers.items.map(
        (item) => new HrCivildefensemanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.hrCivildefensemanpowers,
        items,
      });
    });

const readHrCivildefensemanpowerQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        HrCivildefensemanpowerQuery.getHrCivildefensemanpowerQueryPagination({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrCivildefensemanpowers.items.map(
        (item) => new HrCivildefensemanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.hrCivildefensemanpowers,
        items,
      });
    });

const readUniqueHrCivildefensemanpower = () =>
  apolloInstance
    .query({
      query: UniqueHrCivildefensemanpowerQuery.getUniqueHrCivildefensemanpower,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrCivildefensemanpowers.items.map(
        (item) => new HrCivildefensemanpowerResponse(item),
      );
    });

const readUniqueHrCivildefensemanpowerById = (id) =>
  apolloInstance
    .query({
      query:
        UniqueHrCivildefensemanpowerQuery.getUniqueHrCivildefensemanpowerById(
          id,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrCivildefensemanpowerResponse(
        data.uniqueHrCivildefensemanpowers.items[0],
      );
    });

const readUniqueHrCivildefensemanpowerPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrCivildefensemanpowerQuery.getUniqueHrCivildefensemanpowerPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrCivildefensemanpowers.items.map(
        (item) => new HrCivildefensemanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrCivildefensemanpowers,
        items,
      });
    });

const readUniqueHrCivildefensemanpowerQueryPagination = ({
  query,
  take,
  skip,
}) =>
  apolloInstance
    .query({
      query:
        UniqueHrCivildefensemanpowerQuery.getUniqueHrCivildefensemanpowerQueryPagination(
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
      const items = data.uniqueHrCivildefensemanpowers.items.map(
        (item) => new HrCivildefensemanpowerResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrCivildefensemanpowers,
        items,
      });
    });

export default {
  readHrCivildefensemanpower,
  readHrCivildefensemanpowerById,

  readHrCivildefensemanpowerPagination,
  readHrCivildefensemanpowerQueryPagination,

  readUniqueHrCivildefensemanpower,
  readUniqueHrCivildefensemanpowerById,

  readUniqueHrCivildefensemanpowerPagination,
  readUniqueHrCivildefensemanpowerQueryPagination,
};

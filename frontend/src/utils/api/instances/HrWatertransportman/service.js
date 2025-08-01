import apolloInstance from '../../apollo/apolloInstance';

import HrWatertransportmanQuery from '../../graphql/HrWatertransportman/HrWatertransportmanQuery';
import HrWatertransportmanResponse from '../../../dataModels/HrWatertransportman/HrWatertransportmanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrWatertransportmanQuery from '../../graphql/UniqueHrWatertransportman/UniqueHrWatertransportmanQuery';

const readHrWatertransportman = () =>
  apolloInstance
    .query({
      query: HrWatertransportmanQuery.getHrWatertransportman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrWatertransportmen.items.map(
        (item) => new HrWatertransportmanResponse(item),
      );
    });

const readHrWatertransportmanById = (id) =>
  apolloInstance
    .query({
      query: HrWatertransportmanQuery.getHrWatertransportmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrWatertransportmanResponse(data.hrWatertransportmen.items[0]);
    });

const readHrWatertransportmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrWatertransportmanQuery.getHrWatertransportmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrWatertransportmen.items.map(
        (item) => new HrWatertransportmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrWatertransportmen,
        items,
      });
    });

const readHrWatertransportmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrWatertransportmanQuery.getHrWatertransportmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrWatertransportmen.items.map(
        (item) => new HrWatertransportmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrWatertransportmen,
        items,
      });
    });

const readUniqueHrWatertransportman = () =>
  apolloInstance
    .query({
      query: UniqueHrWatertransportmanQuery.getUniqueHrWatertransportman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrWatertransportmen.items.map(
        (item) => new HrWatertransportmanResponse(item),
      );
    });

const readUniqueHrWatertransportmanById = (id) =>
  apolloInstance
    .query({
      query:
        UniqueHrWatertransportmanQuery.getUniqueHrWatertransportmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrWatertransportmanResponse(
        data.uniqueHrWatertransportmen.items[0],
      );
    });

const readUniqueHrWatertransportmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrWatertransportmanQuery.getUniqueHrWatertransportmanPagination({
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrWatertransportmen.items.map(
        (item) => new HrWatertransportmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrWatertransportmen,
        items,
      });
    });

const readUniqueHrWatertransportmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrWatertransportmanQuery.getUniqueHrWatertransportmanQueryPagination(
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
      const items = data.uniqueHrWatertransportmen.items.map(
        (item) => new HrWatertransportmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrWatertransportmen,
        items,
      });
    });

export default {
  readHrWatertransportman,
  readHrWatertransportmanById,

  readHrWatertransportmanPagination,
  readHrWatertransportmanQueryPagination,

  readUniqueHrWatertransportman,
  readUniqueHrWatertransportmanById,

  readUniqueHrWatertransportmanPagination,
  readUniqueHrWatertransportmanQueryPagination,
};

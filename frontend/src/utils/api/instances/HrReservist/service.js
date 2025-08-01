import apolloInstance from '../../apollo/apolloInstance';

import HrReservistQuery from '../../graphql/HrReservist/HrReservistQuery';
import HrReservistResponse from '../../../dataModels/HrReservist/HrReservistResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrReservistQuery from '../../graphql/UniqueHrReservist/UniqueHrReservistQuery';

const readHrReservist = () =>
  apolloInstance
    .query({
      query: HrReservistQuery.getHrReservist,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrReservists.items.map(
        (item) => new HrReservistResponse(item),
      );
    });

const readHrReservistById = (id) =>
  apolloInstance
    .query({
      query: HrReservistQuery.getHrReservistById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrReservistResponse(data.hrReservists.items[0]);
    });

const readHrReservistPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrReservistQuery.getHrReservistPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrReservists.items.map(
        (item) => new HrReservistResponse(item),
      );
      return new PaginationResponse({
        ...data.hrReservists,
        items,
      });
    });

const readHrReservistQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrReservistQuery.getHrReservistQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrReservists.items.map(
        (item) => new HrReservistResponse(item),
      );
      return new PaginationResponse({
        ...data.hrReservists,
        items,
      });
    });

const readUniqueHrReservist = () =>
  apolloInstance
    .query({
      query: UniqueHrReservistQuery.getUniqueHrReservist,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrReservists.items.map(
        (item) => new HrReservistResponse(item),
      );
    });

const readUniqueHrReservistById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrReservistQuery.getUniqueHrReservistById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrReservistResponse(data.uniqueHrReservists.items[0]);
    });

const readUniqueHrReservistPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrReservistQuery.getUniqueHrReservistPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrReservists.items.map(
        (item) => new HrReservistResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrReservists,
        items,
      });
    });

const readUniqueHrReservistQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrReservistQuery.getUniqueHrReservistQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrReservists.items.map(
        (item) => new HrReservistResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrReservists,
        items,
      });
    });

export default {
  readHrReservist,
  readHrReservistById,

  readHrReservistPagination,
  readHrReservistQueryPagination,

  readUniqueHrReservist,
  readUniqueHrReservistById,

  readUniqueHrReservistPagination,
  readUniqueHrReservistQueryPagination,
};

import apolloInstance from '../../apollo/apolloInstance';

import HrSubservicemanQuery from '../../graphql/HrSubserviceman/HrSubservicemanQuery';
import HrSubservicemanResponse from '../../../dataModels/HrSubserviceman/HrSubservicemanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrSubservicemanQuery from '../../graphql/UniqueHrSubserviceman/UniqueHrSubservicemanQuery';

const readHrSubserviceman = () =>
  apolloInstance
    .query({
      query: HrSubservicemanQuery.getHrSubserviceman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrSubservicemen.items.map(
        (item) => new HrSubservicemanResponse(item),
      );
    });

const readHrSubservicemanById = (id) =>
  apolloInstance
    .query({
      query: HrSubservicemanQuery.getHrSubservicemanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrSubservicemanResponse(data.hrSubservicemen.items[0]);
    });

const readHrSubservicemanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrSubservicemanQuery.getHrSubservicemanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrSubservicemen.items.map(
        (item) => new HrSubservicemanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrSubservicemen,
        items,
      });
    });

const readHrSubservicemanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrSubservicemanQuery.getHrSubservicemanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrSubservicemen.items.map(
        (item) => new HrSubservicemanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrSubservicemen,
        items,
      });
    });

const readUniqueHrSubserviceman = () =>
  apolloInstance
    .query({
      query: UniqueHrSubservicemanQuery.getUniqueHrSubserviceman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrSubservicemen.items.map(
        (item) => new HrSubservicemanResponse(item),
      );
    });

const readUniqueHrSubservicemanById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrSubservicemanQuery.getUniqueHrSubservicemanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrSubservicemanResponse(data.uniqueHrSubservicemen.items[0]);
    });

const readUniqueHrSubservicemanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrSubservicemanQuery.getUniqueHrSubservicemanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrSubservicemen.items.map(
        (item) => new HrSubservicemanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrSubservicemen,
        items,
      });
    });

const readUniqueHrSubservicemanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrSubservicemanQuery.getUniqueHrSubservicemanQueryPagination(
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
      const items = data.uniqueHrSubservicemen.items.map(
        (item) => new HrSubservicemanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrSubservicemen,
        items,
      });
    });

export default {
  readHrSubserviceman,
  readHrSubservicemanById,

  readHrSubservicemanPagination,
  readHrSubservicemanQueryPagination,

  readUniqueHrSubserviceman,
  readUniqueHrSubservicemanById,

  readUniqueHrSubservicemanPagination,
  readUniqueHrSubservicemanQueryPagination,
};

import apolloInstance from '../../apollo/apolloInstance';

import HrCarRepairmanQuery from '../../graphql/HrCarRepairman/HrCarRepairmanQuery';
import HrCarRepairmanResponse from '../../../dataModels/HrCarRepairman/HrCarRepairmanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrCarRepairmanQuery from '../../graphql/UniqueHrCarRepairman/UniqueHrCarRepairmanQuery';

const readHrCarRepairman = () =>
  apolloInstance
    .query({
      query: HrCarRepairmanQuery.getHrCarRepairman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrCarRepairmen.items.map(
        (item) => new HrCarRepairmanResponse(item),
      );
    });

const readHrCarRepairmanById = (id) =>
  apolloInstance
    .query({
      query: HrCarRepairmanQuery.getHrCarRepairmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrCarRepairmanResponse(data.hrCarRepairmen.items[0]);
    });

const readHrCarRepairmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrCarRepairmanQuery.getHrCarRepairmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrCarRepairmen.items.map(
        (item) => new HrCarRepairmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrCarRepairmen,
        items,
      });
    });

const readHrCarRepairmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrCarRepairmanQuery.getHrCarRepairmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrCarRepairmen.items.map(
        (item) => new HrCarRepairmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrCarRepairmen,
        items,
      });
    });

const readUniqueHrCarRepairman = () =>
  apolloInstance
    .query({
      query: UniqueHrCarRepairmanQuery.getUniqueHrCarRepairman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrCarRepairmen.items.map(
        (item) => new HrCarRepairmanResponse(item),
      );
    });

const readUniqueHrCarRepairmanById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrCarRepairmanQuery.getUniqueHrCarRepairmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrCarRepairmanResponse(data.uniqueHrCarRepairmen.items[0]);
    });

const readUniqueHrCarRepairmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrCarRepairmanQuery.getUniqueHrCarRepairmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrCarRepairmen.items.map(
        (item) => new HrCarRepairmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrCarRepairmen,
        items,
      });
    });

const readUniqueHrCarRepairmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrCarRepairmanQuery.getUniqueHrCarRepairmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrCarRepairmen.items.map(
        (item) => new HrCarRepairmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrCarRepairmen,
        items,
      });
    });

export default {
  readHrCarRepairman,
  readHrCarRepairmanById,

  readHrCarRepairmanPagination,
  readHrCarRepairmanQueryPagination,

  readUniqueHrCarRepairman,
  readUniqueHrCarRepairmanById,

  readUniqueHrCarRepairmanPagination,
  readUniqueHrCarRepairmanQueryPagination,
};

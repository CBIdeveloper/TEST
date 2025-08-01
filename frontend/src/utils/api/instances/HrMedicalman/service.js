import apolloInstance from '../../apollo/apolloInstance';

import HrMedicalmanQuery from '../../graphql/HrMedicalman/HrMedicalmanQuery';
import HrMedicalmanResponse from '../../../dataModels/HrMedicalman/HrMedicalmanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrMedicalmanQuery from '../../graphql/UniqueHrMedicalman/UniqueHrMedicalmanQuery';

const readHrMedicalman = () =>
  apolloInstance
    .query({
      query: HrMedicalmanQuery.getHrMedicalman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrMedicalmen.items.map(
        (item) => new HrMedicalmanResponse(item),
      );
    });

const readHrMedicalmanById = (id) =>
  apolloInstance
    .query({
      query: HrMedicalmanQuery.getHrMedicalmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrMedicalmanResponse(data.hrMedicalmen.items[0]);
    });

const readHrMedicalmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrMedicalmanQuery.getHrMedicalmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMedicalmen.items.map(
        (item) => new HrMedicalmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMedicalmen,
        items,
      });
    });

const readHrMedicalmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrMedicalmanQuery.getHrMedicalmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMedicalmen.items.map(
        (item) => new HrMedicalmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMedicalmen,
        items,
      });
    });

const readUniqueHrMedicalman = () =>
  apolloInstance
    .query({
      query: UniqueHrMedicalmanQuery.getUniqueHrMedicalman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrMedicalmen.items.map(
        (item) => new HrMedicalmanResponse(item),
      );
    });

const readUniqueHrMedicalmanById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrMedicalmanQuery.getUniqueHrMedicalmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrMedicalmanResponse(data.uniqueHrMedicalmen.items[0]);
    });

const readUniqueHrMedicalmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrMedicalmanQuery.getUniqueHrMedicalmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrMedicalmen.items.map(
        (item) => new HrMedicalmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrMedicalmen,
        items,
      });
    });

const readUniqueHrMedicalmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrMedicalmanQuery.getUniqueHrMedicalmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrMedicalmen.items.map(
        (item) => new HrMedicalmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrMedicalmen,
        items,
      });
    });

export default {
  readHrMedicalman,
  readHrMedicalmanById,

  readHrMedicalmanPagination,
  readHrMedicalmanQueryPagination,

  readUniqueHrMedicalman,
  readUniqueHrMedicalmanById,

  readUniqueHrMedicalmanPagination,
  readUniqueHrMedicalmanQueryPagination,
};

import apolloInstance from '../../apollo/apolloInstance';

import HrMilitaryMedicalmanQuery from '../../graphql/HrMilitaryMedicalman/HrMilitaryMedicalmanQuery';
import HrMilitaryMedicalmanResponse from '../../../dataModels/HrMilitaryMedicalman/HrMilitaryMedicalmanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrMilitaryMedicalmanQuery from '../../graphql/UniqueHrMilitaryMedicalman/UniqueHrMilitaryMedicalmanQuery';

const readHrMilitaryMedicalman = () =>
  apolloInstance
    .query({
      query: HrMilitaryMedicalmanQuery.getHrMilitaryMedicalman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrMilitaryMedicalmen.items.map(
        (item) => new HrMilitaryMedicalmanResponse(item),
      );
    });

const readHrMilitaryMedicalmanById = (id) =>
  apolloInstance
    .query({
      query: HrMilitaryMedicalmanQuery.getHrMilitaryMedicalmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrMilitaryMedicalmanResponse(
        data.hrMilitaryMedicalmen.items[0],
      );
    });

const readHrMilitaryMedicalmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrMilitaryMedicalmanQuery.getHrMilitaryMedicalmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMilitaryMedicalmen.items.map(
        (item) => new HrMilitaryMedicalmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMilitaryMedicalmen,
        items,
      });
    });

const readHrMilitaryMedicalmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrMilitaryMedicalmanQuery.getHrMilitaryMedicalmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMilitaryMedicalmen.items.map(
        (item) => new HrMilitaryMedicalmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMilitaryMedicalmen,
        items,
      });
    });

const readUniqueHrMilitaryMedicalman = () =>
  apolloInstance
    .query({
      query: UniqueHrMilitaryMedicalmanQuery.getUniqueHrMilitaryMedicalman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrMilitaryMedicalmen.items.map(
        (item) => new HrMilitaryMedicalmanResponse(item),
      );
    });

const readUniqueHrMilitaryMedicalmanById = (id) =>
  apolloInstance
    .query({
      query:
        UniqueHrMilitaryMedicalmanQuery.getUniqueHrMilitaryMedicalmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrMilitaryMedicalmanResponse(
        data.uniqueHrMilitaryMedicalmen.items[0],
      );
    });

const readUniqueHrMilitaryMedicalmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrMilitaryMedicalmanQuery.getUniqueHrMilitaryMedicalmanPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrMilitaryMedicalmen.items.map(
        (item) => new HrMilitaryMedicalmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrMilitaryMedicalmen,
        items,
      });
    });

const readUniqueHrMilitaryMedicalmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrMilitaryMedicalmanQuery.getUniqueHrMilitaryMedicalmanQueryPagination(
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
      const items = data.uniqueHrMilitaryMedicalmen.items.map(
        (item) => new HrMilitaryMedicalmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrMilitaryMedicalmen,
        items,
      });
    });

export default {
  readHrMilitaryMedicalman,
  readHrMilitaryMedicalmanById,

  readHrMilitaryMedicalmanPagination,
  readHrMilitaryMedicalmanQueryPagination,

  readUniqueHrMilitaryMedicalman,
  readUniqueHrMilitaryMedicalmanById,

  readUniqueHrMilitaryMedicalmanPagination,
  readUniqueHrMilitaryMedicalmanQueryPagination,
};

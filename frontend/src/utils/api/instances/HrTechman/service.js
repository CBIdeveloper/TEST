import apolloInstance from '../../apollo/apolloInstance';

import HrTechmanQuery from '../../graphql/HrTechman/HrTechmanQuery';
import HrTechmanResponse from '../../../dataModels/HrTechman/HrTechmanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrTechmanQuery from '../../graphql/UniqueHrTechman/UniqueHrTechmanQuery';

const readHrTechman = () =>
  apolloInstance
    .query({
      query: HrTechmanQuery.getHrTechman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrTechmen.items.map((item) => new HrTechmanResponse(item));
    });

const readHrTechmanById = (id) =>
  apolloInstance
    .query({
      query: HrTechmanQuery.getHrTechmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrTechmanResponse(data.hrTechmen.items[0]);
    });

const readHrTechmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrTechmanQuery.getHrTechmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrTechmen.items.map(
        (item) => new HrTechmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrTechmen,
        items,
      });
    });

const readHrTechmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrTechmanQuery.getHrTechmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrTechmen.items.map(
        (item) => new HrTechmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrTechmen,
        items,
      });
    });

const readUniqueHrTechman = () =>
  apolloInstance
    .query({
      query: UniqueHrTechmanQuery.getUniqueHrTechman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrTechmen.items.map(
        (item) => new HrTechmanResponse(item),
      );
    });

const readUniqueHrTechmanById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrTechmanQuery.getUniqueHrTechmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrTechmanResponse(data.uniqueHrTechmen.items[0]);
    });

const readUniqueHrTechmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrTechmanQuery.getUniqueHrTechmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrTechmen.items.map(
        (item) => new HrTechmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrTechmen,
        items,
      });
    });

const readUniqueHrTechmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrTechmanQuery.getUniqueHrTechmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrTechmen.items.map(
        (item) => new HrTechmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrTechmen,
        items,
      });
    });

export default {
  readHrTechman,
  readHrTechmanById,

  readHrTechmanPagination,
  readHrTechmanQueryPagination,

  readUniqueHrTechman,
  readUniqueHrTechmanById,

  readUniqueHrTechmanPagination,
  readUniqueHrTechmanQueryPagination,
};

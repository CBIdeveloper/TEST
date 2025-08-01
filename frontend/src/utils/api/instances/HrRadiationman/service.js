import apolloInstance from '../../apollo/apolloInstance';

import HrRadiationmanQuery from '../../graphql/HrRadiationman/HrRadiationmanQuery';
import HrRadiationmanResponse from '../../../dataModels/HrRadiationman/HrRadiationmanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrRadiationmanQuery from '../../graphql/UniqueHrRadiationman/UniqueHrRadiationmanQuery';

const readHrRadiationman = () =>
  apolloInstance
    .query({
      query: HrRadiationmanQuery.getHrRadiationman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrRadiationmen.items.map(
        (item) => new HrRadiationmanResponse(item),
      );
    });

const readHrRadiationmanById = (id) =>
  apolloInstance
    .query({
      query: HrRadiationmanQuery.getHrRadiationmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrRadiationmanResponse(data.hrRadiationmen.items[0]);
    });

const readHrRadiationmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrRadiationmanQuery.getHrRadiationmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrRadiationmen.items.map(
        (item) => new HrRadiationmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrRadiationmen,
        items,
      });
    });

const readHrRadiationmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrRadiationmanQuery.getHrRadiationmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrRadiationmen.items.map(
        (item) => new HrRadiationmanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrRadiationmen,
        items,
      });
    });

const readUniqueHrRadiationman = () =>
  apolloInstance
    .query({
      query: UniqueHrRadiationmanQuery.getUniqueHrRadiationman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrRadiationmen.items.map(
        (item) => new HrRadiationmanResponse(item),
      );
    });

const readUniqueHrRadiationmanById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrRadiationmanQuery.getUniqueHrRadiationmanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrRadiationmanResponse(data.uniqueHrRadiationmen.items[0]);
    });

const readUniqueHrRadiationmanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrRadiationmanQuery.getUniqueHrRadiationmanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrRadiationmen.items.map(
        (item) => new HrRadiationmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrRadiationmen,
        items,
      });
    });

const readUniqueHrRadiationmanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrRadiationmanQuery.getUniqueHrRadiationmanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrRadiationmen.items.map(
        (item) => new HrRadiationmanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrRadiationmen,
        items,
      });
    });

export default {
  readHrRadiationman,
  readHrRadiationmanById,

  readHrRadiationmanPagination,
  readHrRadiationmanQueryPagination,

  readUniqueHrRadiationman,
  readUniqueHrRadiationmanById,

  readUniqueHrRadiationmanPagination,
  readUniqueHrRadiationmanQueryPagination,
};

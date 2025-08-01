import apolloInstance from '../../apollo/apolloInstance';

import FrStorehouseQuery from '../../graphql/FrStorehouse/FrStorehouseQuery';
import FrStorehouseResponse from '../../../dataModels/FrStorehouse/FrStorehouseResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrStorehouse = () =>
  apolloInstance
    .query({
      query: FrStorehouseQuery.getFrStorehouse,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frStorehouses.items.map(
        (item) => new FrStorehouseResponse(item),
      );
    });

const readFrStorehouseById = (id) =>
  apolloInstance
    .query({
      query: FrStorehouseQuery.getFrStorehouseById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrStorehouseResponse(data.frStorehouses.items[0]);
    });

const readFrStorehousePagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrStorehouseQuery.getFrStorehousePagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frStorehouses.items.map(
        (item) => new FrStorehouseResponse(item),
      );
      return new PaginationResponse({
        ...data.frStorehouses,
        items,
      });
    });

const readFrStorehouseQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrStorehouseQuery.getFrStorehouseQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frStorehouses.items.map(
        (item) => new FrStorehouseResponse(item),
      );
      return new PaginationResponse({
        ...data.frStorehouses,
        items,
      });
    });

export default {
  readFrStorehouse,
  readFrStorehouseById,

  readFrStorehousePagination,
  readFrStorehouseQueryPagination,
};

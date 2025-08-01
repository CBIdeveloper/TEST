import apolloInstance from '../../apollo/apolloInstance';

import FrReservoirQuery from '../../graphql/FrReservoir/FrReservoirQuery';
import FrReservoirResponse from '../../../dataModels/FrReservoir/FrReservoirResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrReservoir = () =>
  apolloInstance
    .query({
      query: FrReservoirQuery.getFrReservoir,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frReservoirs.items.map(
        (item) => new FrReservoirResponse(item),
      );
    });

const readFrReservoirById = (id) =>
  apolloInstance
    .query({
      query: FrReservoirQuery.getFrReservoirById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrReservoirResponse(data.frReservoirs.items[0]);
    });

const readFrReservoirPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrReservoirQuery.getFrReservoirPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frReservoirs.items.map(
        (item) => new FrReservoirResponse(item),
      );
      return new PaginationResponse({
        ...data.frReservoirs,
        items,
      });
    });

const readFrReservoirQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrReservoirQuery.getFrReservoirQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frReservoirs.items.map(
        (item) => new FrReservoirResponse(item),
      );
      return new PaginationResponse({
        ...data.frReservoirs,
        items,
      });
    });

export default {
  readFrReservoir,
  readFrReservoirById,

  readFrReservoirPagination,
  readFrReservoirQueryPagination,
};

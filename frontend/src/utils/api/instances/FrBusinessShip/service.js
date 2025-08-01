import apolloInstance from '../../apollo/apolloInstance';

import FrBusinessShipQuery from '../../graphql/FrBusinessShip/FrBusinessShipQuery';
import FrBusinessShipResponse from '../../../dataModels/FrBusinessShip/FrBusinessShipResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrBusinessShip = () =>
  apolloInstance
    .query({
      query: FrBusinessShipQuery.getFrBusinessShip,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frBusinessShips.items.map(
        (item) => new FrBusinessShipResponse(item),
      );
    });

const readFrBusinessShipById = (id) =>
  apolloInstance
    .query({
      query: FrBusinessShipQuery.getFrBusinessShipById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrBusinessShipResponse(data.frBusinessShips.items[0]);
    });

const readFrBusinessShipPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrBusinessShipQuery.getFrBusinessShipPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frBusinessShips.items.map(
        (item) => new FrBusinessShipResponse(item),
      );
      return new PaginationResponse({
        ...data.frBusinessShips,
        items,
      });
    });

const readFrBusinessShipQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrBusinessShipQuery.getFrBusinessShipQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frBusinessShips.items.map(
        (item) => new FrBusinessShipResponse(item),
      );
      return new PaginationResponse({
        ...data.frBusinessShips,
        items,
      });
    });

export default {
  readFrBusinessShip,
  readFrBusinessShipById,

  readFrBusinessShipPagination,
  readFrBusinessShipQueryPagination,
};

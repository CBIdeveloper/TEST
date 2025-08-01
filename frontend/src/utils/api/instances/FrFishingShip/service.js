import apolloInstance from '../../apollo/apolloInstance';

import FrFishingShipQuery from '../../graphql/FrFishingShip/FrFishingShipQuery';
import FrFishingShipResponse from '../../../dataModels/FrFishingShip/FrFishingShipResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrFishingShip = () =>
  apolloInstance
    .query({
      query: FrFishingShipQuery.getFrFishingShip,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frFishingShips.items.map(
        (item) => new FrFishingShipResponse(item),
      );
    });

const readFrFishingShipById = (id) =>
  apolloInstance
    .query({
      query: FrFishingShipQuery.getFrFishingShipById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrFishingShipResponse(data.frFishingShips.items[0]);
    });

const readFrFishingShipPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrFishingShipQuery.getFrFishingShipPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frFishingShips.items.map(
        (item) => new FrFishingShipResponse(item),
      );
      return new PaginationResponse({
        ...data.frFishingShips,
        items,
      });
    });

const readFrFishingShipQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrFishingShipQuery.getFrFishingShipQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frFishingShips.items.map(
        (item) => new FrFishingShipResponse(item),
      );
      return new PaginationResponse({
        ...data.frFishingShips,
        items,
      });
    });

export default {
  readFrFishingShip,
  readFrFishingShipById,

  readFrFishingShipPagination,
  readFrFishingShipQueryPagination,
};

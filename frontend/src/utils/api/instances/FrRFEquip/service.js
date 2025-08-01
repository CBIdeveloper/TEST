import apolloInstance from '../../apollo/apolloInstance';

import FrRfEquipQuery from '../../graphql/FrRFEquip/FrRFEquipQuery';
import FrRFEquipResponse from '../../../dataModels/FrRFEquip/FrRFEquipResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrRfEquip = () =>
  apolloInstance
    .query({
      query: FrRfEquipQuery.getFrRfEquip,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frRfEquips.items.map((item) => new FrRFEquipResponse(item));
    });

const readFrRfEquipById = (id) =>
  apolloInstance
    .query({
      query: FrRfEquipQuery.getFrRfEquipById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrRFEquipResponse(data.frRfEquips.items[0]);
    });

const readFrRfEquipPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrRfEquipQuery.getFrRfEquipPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frRfEquips.items.map(
        (item) => new FrRFEquipResponse(item),
      );
      return new PaginationResponse({
        ...data.frRfEquips,
        items,
      });
    });

const readFrRfEquipQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrRfEquipQuery.getFrRfEquipQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frRfEquips.items.map(
        (item) => new FrRFEquipResponse(item),
      );
      return new PaginationResponse({
        ...data.frRfEquips,
        items,
      });
    });

export default {
  readFrRfEquip,
  readFrRfEquipById,

  readFrRfEquipPagination,
  readFrRfEquipQueryPagination,
};

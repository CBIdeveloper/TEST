import apolloInstance from '../../apollo/apolloInstance';

import FrHeavymachineryQuery from '../../graphql/FrHeavymachinery/FrHeavymachineryQuery';
import FrHeavymachineryResponse from '../../../dataModels/FrHeavymachinery/FrHeavymachineryResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrHeavymachinery = () =>
  apolloInstance
    .query({
      query: FrHeavymachineryQuery.getFrHeavymachinery,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frHeavymachineries.items.map(
        (item) => new FrHeavymachineryResponse(item),
      );
    });

const readFrHeavymachineryById = (id) =>
  apolloInstance
    .query({
      query: FrHeavymachineryQuery.getFrHeavymachineryById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrHeavymachineryResponse(data.frHeavymachineries.items[0]);
    });

const readFrHeavymachineryPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrHeavymachineryQuery.getFrHeavymachineryPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frHeavymachineries.items.map(
        (item) => new FrHeavymachineryResponse(item),
      );
      return new PaginationResponse({
        ...data.frHeavymachineries,
        items,
      });
    });

const readFrHeavymachineryQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrHeavymachineryQuery.getFrHeavymachineryQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frHeavymachineries.items.map(
        (item) => new FrHeavymachineryResponse(item),
      );
      return new PaginationResponse({
        ...data.frHeavymachineries,
        items,
      });
    });

export default {
  readFrHeavymachinery,
  readFrHeavymachineryById,

  readFrHeavymachineryPagination,
  readFrHeavymachineryQueryPagination,
};

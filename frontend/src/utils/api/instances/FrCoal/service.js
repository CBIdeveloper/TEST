import apolloInstance from '../../apollo/apolloInstance';

import FrCoalQuery from '../../graphql/FrCoal/FrCoalQuery';
import FrCoalResponse from '../../../dataModels/FrCoal/FrCoalResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrCoal = () =>
  apolloInstance
    .query({
      query: FrCoalQuery.getFrCoal,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frCoals.items.map((item) => new FrCoalResponse(item));
    });

const readFrCoalById = (id) =>
  apolloInstance
    .query({
      query: FrCoalQuery.getFrCoalById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrCoalResponse(data.frCoals.items[0]);
    });

const readFrCoalPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrCoalQuery.getFrCoalPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frCoals.items.map((item) => new FrCoalResponse(item));
      return new PaginationResponse({
        ...data.frCoals,
        items,
      });
    });

const readFrCoalQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrCoalQuery.getFrCoalQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frCoals.items.map((item) => new FrCoalResponse(item));
      return new PaginationResponse({
        ...data.frCoals,
        items,
      });
    });

export default {
  readFrCoal,
  readFrCoalById,

  readFrCoalPagination,
  readFrCoalQueryPagination,
};

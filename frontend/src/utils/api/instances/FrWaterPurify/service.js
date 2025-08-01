import apolloInstance from '../../apollo/apolloInstance';

import FrWaterPurifyQuery from '../../graphql/FrWaterPurify/FrWaterPurifyQuery';
import FrWaterPurifyResponse from '../../../dataModels/FrWaterPurify/FrWaterPurifyResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrWaterPurify = () =>
  apolloInstance
    .query({
      query: FrWaterPurifyQuery.getFrWaterPurify,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frWaterPurifies.items.map(
        (item) => new FrWaterPurifyResponse(item),
      );
    });

const readFrWaterPurifyById = (id) =>
  apolloInstance
    .query({
      query: FrWaterPurifyQuery.getFrWaterPurifyById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrWaterPurifyResponse(data.frWaterPurifies.items[0]);
    });

const readFrWaterPurifyPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrWaterPurifyQuery.getFrWaterPurifyPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frWaterPurifies.items.map(
        (item) => new FrWaterPurifyResponse(item),
      );
      return new PaginationResponse({
        ...data.frWaterPurifies,
        items,
      });
    });

const readFrWaterPurifyQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrWaterPurifyQuery.getFrWaterPurifyQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frWaterPurifies.items.map(
        (item) => new FrWaterPurifyResponse(item),
      );
      return new PaginationResponse({
        ...data.frWaterPurifies,
        items,
      });
    });

export default {
  readFrWaterPurify,
  readFrWaterPurifyById,

  readFrWaterPurifyPagination,
  readFrWaterPurifyQueryPagination,
};

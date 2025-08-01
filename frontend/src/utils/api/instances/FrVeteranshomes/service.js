import apolloInstance from '../../apollo/apolloInstance';

import FrVeteranshomesQuery from '../../graphql/FrVeteranshomes/FrVeteranshomesQuery';
import FrVeteranshomesResponse from '../../../dataModels/FrVeteranshomes/FrVeteranshomesResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrVeteranshomes = () =>
  apolloInstance
    .query({
      query: FrVeteranshomesQuery.getFrVeteranshomes,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frVeteranshomes.items.map(
        (item) => new FrVeteranshomesResponse(item),
      );
    });

const readFrVeteranshomesById = (id) =>
  apolloInstance
    .query({
      query: FrVeteranshomesQuery.getFrVeteranshomesById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrVeteranshomesResponse(data.frVeteranshomes.items[0]);
    });

const readFrVeteranshomesPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrVeteranshomesQuery.getFrVeteranshomesPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frVeteranshomes.items.map(
        (item) => new FrVeteranshomesResponse(item),
      );
      return new PaginationResponse({
        ...data.frVeteranshomes,
        items,
      });
    });

const readFrVeteranshomesQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrVeteranshomesQuery.getFrVeteranshomesQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frVeteranshomes.items.map(
        (item) => new FrVeteranshomesResponse(item),
      );
      return new PaginationResponse({
        ...data.frVeteranshomes,
        items,
      });
    });

export default {
  readFrVeteranshomes,
  readFrVeteranshomesById,

  readFrVeteranshomesPagination,
  readFrVeteranshomesQueryPagination,
};

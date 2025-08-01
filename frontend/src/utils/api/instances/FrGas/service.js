import apolloInstance from '../../apollo/apolloInstance';

import FrGasQuery from '../../graphql/FrGas/FrGasQuery';
import FrGasResponse from '../../../dataModels/FrGas/FrGasResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrGas = () =>
  apolloInstance
    .query({
      query: FrGasQuery.getFrGas,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frGas.items.map((item) => new FrGasResponse(item));
    });

const readFrGasById = (id) =>
  apolloInstance
    .query({
      query: FrGasQuery.getFrGasById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrGasResponse(data.frGas.items[0]);
    });

const readFrGasPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrGasQuery.getFrGasPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frGas.items.map((item) => new FrGasResponse(item));
      return new PaginationResponse({
        ...data.frGas,
        items,
      });
    });

const readFrGasQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrGasQuery.getFrGasQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frGas.items.map((item) => new FrGasResponse(item));
      return new PaginationResponse({
        ...data.frGas,
        items,
      });
    });

export default {
  readFrGas,
  readFrGasById,

  readFrGasPagination,
  readFrGasQueryPagination,
};

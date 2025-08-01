import apolloInstance from '../../apollo/apolloInstance';

import FrOilQuery from '../../graphql/FrOil/FrOilQuery';
import FrOilResponse from '../../../dataModels/FrOil/FrOilResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrOil = () =>
  apolloInstance
    .query({
      query: FrOilQuery.getFrOil,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frOils.items.map((item) => new FrOilResponse(item));
    });

const readFrOilById = (id) =>
  apolloInstance
    .query({
      query: FrOilQuery.getFrOilById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrOilResponse(data.frOils.items[0]);
    });

const readFrOilPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrOilQuery.getFrOilPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frOils.items.map((item) => new FrOilResponse(item));
      return new PaginationResponse({
        ...data.frOils,
        items,
      });
    });

const readFrOilQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrOilQuery.getFrOilQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frOils.items.map((item) => new FrOilResponse(item));
      return new PaginationResponse({
        ...data.frOils,
        items,
      });
    });

export default {
  readFrOil,
  readFrOilById,

  readFrOilPagination,
  readFrOilQueryPagination,
};

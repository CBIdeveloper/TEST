import apolloInstance from '../../apollo/apolloInstance';

import FrMajormaterialQuery from '../../graphql/FrMajormaterial/FrMajormaterialQuery';
import FrMajormaterialResponse from '../../../dataModels/FrMajormaterial/FrMajormaterialResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrMajormaterial = () =>
  apolloInstance
    .query({
      query: FrMajormaterialQuery.getFrMajormaterial,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frMajormaterials.items.map(
        (item) => new FrMajormaterialResponse(item),
      );
    });

const readFrMajormaterialById = (id) =>
  apolloInstance
    .query({
      query: FrMajormaterialQuery.getFrMajormaterialById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrMajormaterialResponse(data.frMajormaterials.items[0]);
    });

const readFrMajormaterialPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrMajormaterialQuery.getFrMajormaterialPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frMajormaterials.items.map(
        (item) => new FrMajormaterialResponse(item),
      );
      return new PaginationResponse({
        ...data.frMajormaterials,
        items,
      });
    });

const readFrMajormaterialQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrMajormaterialQuery.getFrMajormaterialQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frMajormaterials.items.map(
        (item) => new FrMajormaterialResponse(item),
      );
      return new PaginationResponse({
        ...data.frMajormaterials,
        items,
      });
    });

export default {
  readFrMajormaterial,
  readFrMajormaterialById,

  readFrMajormaterialPagination,
  readFrMajormaterialQueryPagination,
};

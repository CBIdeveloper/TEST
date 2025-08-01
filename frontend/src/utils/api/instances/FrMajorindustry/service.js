import apolloInstance from '../../apollo/apolloInstance';

import FrMajorindustryQuery from '../../graphql/FrMajorindustry/FrMajorindustryQuery';
import FrMajorindustryResponse from '../../../dataModels/FrMajorindustry/FrMajorindustryResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrMajorindustry = () =>
  apolloInstance
    .query({
      query: FrMajorindustryQuery.getFrMajorindustry,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frMajorindustries.items.map(
        (item) => new FrMajorindustryResponse(item),
      );
    });

const readFrMajorindustryById = (id) =>
  apolloInstance
    .query({
      query: FrMajorindustryQuery.getFrMajorindustryById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrMajorindustryResponse(data.frMajorindustries.items[0]);
    });

const readFrMajorindustryPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrMajorindustryQuery.getFrMajorindustryPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frMajorindustries.items.map(
        (item) => new FrMajorindustryResponse(item),
      );
      return new PaginationResponse({
        ...data.frMajorindustries,
        items,
      });
    });

const readFrMajorindustryQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrMajorindustryQuery.getFrMajorindustryQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frMajorindustries.items.map(
        (item) => new FrMajorindustryResponse(item),
      );
      return new PaginationResponse({
        ...data.frMajorindustries,
        items,
      });
    });

export default {
  readFrMajorindustry,
  readFrMajorindustryById,

  readFrMajorindustryPagination,
  readFrMajorindustryQueryPagination,
};

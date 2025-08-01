import apolloInstance from '../../apollo/apolloInstance';

import FrActivitycenterQuery from '../../graphql/FrActivitycenter/FrActivitycenterQuery';
import FrActivitycenterResponse from '../../../dataModels/FrActivitycenter/FrActivitycenterResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrActivitycenter = () =>
  apolloInstance
    .query({
      query: FrActivitycenterQuery.getFrActivitycenter,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frActivitycenters.items.map(
        (item) => new FrActivitycenterResponse(item),
      );
    });

const readFrActivitycenterById = (id) =>
  apolloInstance
    .query({
      query: FrActivitycenterQuery.getFrActivitycenterById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrActivitycenterResponse(data.frActivitycenters.items[0]);
    });

const readFrActivitycenterPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrActivitycenterQuery.getFrActivitycenterPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frActivitycenters.items.map(
        (item) => new FrActivitycenterResponse(item),
      );
      return new PaginationResponse({
        ...data.frActivitycenters,
        items,
      });
    });

const readFrActivitycenterQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrActivitycenterQuery.getFrActivitycenterQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frActivitycenters.items.map(
        (item) => new FrActivitycenterResponse(item),
      );
      return new PaginationResponse({
        ...data.frActivitycenters,
        items,
      });
    });

export default {
  readFrActivitycenter,
  readFrActivitycenterById,

  readFrActivitycenterPagination,
  readFrActivitycenterQueryPagination,
};

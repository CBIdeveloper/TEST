import apolloInstance from '../../apollo/apolloInstance';

import FrDroneQuery from '../../graphql/FrDrone/FrDroneQuery';
import FrDroneResponse from '../../../dataModels/FrDrone/FrDroneResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrDrone = () =>
  apolloInstance
    .query({
      query: FrDroneQuery.getFrDrone,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frDrones.items.map((item) => new FrDroneResponse(item));
    });

const readFrDroneById = (id) =>
  apolloInstance
    .query({
      query: FrDroneQuery.getFrDroneById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrDroneResponse(data.frDrones.items[0]);
    });

const readFrDronePagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrDroneQuery.getFrDronePagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frDrones.items.map(
        (item) => new FrDroneResponse(item),
      );
      return new PaginationResponse({
        ...data.frDrones,
        items,
      });
    });

const readFrDroneQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrDroneQuery.getFrDroneQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frDrones.items.map(
        (item) => new FrDroneResponse(item),
      );
      return new PaginationResponse({
        ...data.frDrones,
        items,
      });
    });

export default {
  readFrDrone,
  readFrDroneById,

  readFrDronePagination,
  readFrDroneQueryPagination,
};

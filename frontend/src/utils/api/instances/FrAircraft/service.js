import apolloInstance from '../../apollo/apolloInstance';

import FrAircraftQuery from '../../graphql/FrAircraft/FrAircraftQuery';
import FrAircraftResponse from '../../../dataModels/FrAircraft/FrAircraftResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrAircraft = () =>
  apolloInstance
    .query({
      query: FrAircraftQuery.getFrAircraft,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frAircrafts.items.map((item) => new FrAircraftResponse(item));
    });

const readFrAircraftById = (id) =>
  apolloInstance
    .query({
      query: FrAircraftQuery.getFrAircraftById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrAircraftResponse(data.frAircrafts.items[0]);
    });

const readFrAircraftPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrAircraftQuery.getFrAircraftPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frAircrafts.items.map(
        (item) => new FrAircraftResponse(item),
      );
      return new PaginationResponse({
        ...data.frAircrafts,
        items,
      });
    });

const readFrAircraftQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrAircraftQuery.getFrAircraftQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frAircrafts.items.map(
        (item) => new FrAircraftResponse(item),
      );
      return new PaginationResponse({
        ...data.frAircrafts,
        items,
      });
    });

export default {
  readFrAircraft,
  readFrAircraftById,

  readFrAircraftPagination,
  readFrAircraftQueryPagination,
};

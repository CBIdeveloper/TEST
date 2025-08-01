import apolloInstance from '../../apollo/apolloInstance';

import FrVehicletransportQuery from '../../graphql/FrVehicletransport/FrVehicletransportQuery';
import FrVehicletransportResponse from '../../../dataModels/FrVehicletransport/FrVehicletransportResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrVehicletransport = () =>
  apolloInstance
    .query({
      query: FrVehicletransportQuery.getFrVehicletransport,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frVehicletransports.items.map(
        (item) => new FrVehicletransportResponse(item),
      );
    });

const readFrVehicletransportById = (id) =>
  apolloInstance
    .query({
      query: FrVehicletransportQuery.getFrVehicletransportById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrVehicletransportResponse(data.frVehicletransports.items[0]);
    });

const readFrVehicletransportPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrVehicletransportQuery.getFrVehicletransportPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frVehicletransports.items.map(
        (item) => new FrVehicletransportResponse(item),
      );
      return new PaginationResponse({
        ...data.frVehicletransports,
        items,
      });
    });

const readFrVehicletransportQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrVehicletransportQuery.getFrVehicletransportQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frVehicletransports.items.map(
        (item) => new FrVehicletransportResponse(item),
      );
      return new PaginationResponse({
        ...data.frVehicletransports,
        items,
      });
    });

export default {
  readFrVehicletransport,
  readFrVehicletransportById,

  readFrVehicletransportPagination,
  readFrVehicletransportQueryPagination,
};

import apolloInstance from '../../apollo/apolloInstance';

import FrDedicatedTelecomQuery from '../../graphql/FrDedicatedTelecom/FrDedicatedTelecomQuery';
import FrDedicatedTelecomResponse from '../../../dataModels/FrDedicatedTelecom/FrDedicatedTelecomResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrDedicatedTelecom = () =>
  apolloInstance
    .query({
      query: FrDedicatedTelecomQuery.getFrDedicatedTelecom,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frDedicatedTelecoms.items.map(
        (item) => new FrDedicatedTelecomResponse(item),
      );
    });

const readFrDedicatedTelecomById = (id) =>
  apolloInstance
    .query({
      query: FrDedicatedTelecomQuery.getFrDedicatedTelecomById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrDedicatedTelecomResponse(data.frDedicatedTelecoms.items[0]);
    });

const readFrDedicatedTelecomPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrDedicatedTelecomQuery.getFrDedicatedTelecomPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frDedicatedTelecoms.items.map(
        (item) => new FrDedicatedTelecomResponse(item),
      );
      return new PaginationResponse({
        ...data.frDedicatedTelecoms,
        items,
      });
    });

const readFrDedicatedTelecomQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrDedicatedTelecomQuery.getFrDedicatedTelecomQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frDedicatedTelecoms.items.map(
        (item) => new FrDedicatedTelecomResponse(item),
      );
      return new PaginationResponse({
        ...data.frDedicatedTelecoms,
        items,
      });
    });

export default {
  readFrDedicatedTelecom,
  readFrDedicatedTelecomById,

  readFrDedicatedTelecomPagination,
  readFrDedicatedTelecomQueryPagination,
};

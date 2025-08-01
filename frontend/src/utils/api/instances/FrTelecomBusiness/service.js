import apolloInstance from '../../apollo/apolloInstance';

import FrTelecomBusinessQuery from '../../graphql/FrTelecomBusiness/FrTelecomBusinessQuery';
import FrTelecomBusinessResponse from '../../../dataModels/FrTelecomBusiness/FrTelecomBusinessResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrTelecomBusiness = () =>
  apolloInstance
    .query({
      query: FrTelecomBusinessQuery.getFrTelecomBusiness,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frTelecomBusinesses.items.map(
        (item) => new FrTelecomBusinessResponse(item),
      );
    });

const readFrTelecomBusinessById = (id) =>
  apolloInstance
    .query({
      query: FrTelecomBusinessQuery.getFrTelecomBusinessById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrTelecomBusinessResponse(data.frTelecomBusinesses.items[0]);
    });

const readFrTelecomBusinessPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrTelecomBusinessQuery.getFrTelecomBusinessPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frTelecomBusinesses.items.map(
        (item) => new FrTelecomBusinessResponse(item),
      );
      return new PaginationResponse({
        ...data.frTelecomBusinesses,
        items,
      });
    });

const readFrTelecomBusinessQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrTelecomBusinessQuery.getFrTelecomBusinessQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frTelecomBusinesses.items.map(
        (item) => new FrTelecomBusinessResponse(item),
      );
      return new PaginationResponse({
        ...data.frTelecomBusinesses,
        items,
      });
    });

export default {
  readFrTelecomBusiness,
  readFrTelecomBusinessById,

  readFrTelecomBusinessPagination,
  readFrTelecomBusinessQueryPagination,
};

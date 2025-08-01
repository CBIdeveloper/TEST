import apolloInstance from '../../apollo/apolloInstance';

import FrRadiationProtectQuery from '../../graphql/FrRadiationProtect/FrRadiationProtectQuery';
import FrRadiationProtectResponse from '../../../dataModels/FrRadiationProtect/FrRadiationProtectResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrRadiationProtect = () =>
  apolloInstance
    .query({
      query: FrRadiationProtectQuery.getFrRadiationProtect,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frRadiationProtects.items.map(
        (item) => new FrRadiationProtectResponse(item),
      );
    });

const readFrRadiationProtectById = (id) =>
  apolloInstance
    .query({
      query: FrRadiationProtectQuery.getFrRadiationProtectById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrRadiationProtectResponse(data.frRadiationProtects.items[0]);
    });

const readFrRadiationProtectPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrRadiationProtectQuery.getFrRadiationProtectPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frRadiationProtects.items.map(
        (item) => new FrRadiationProtectResponse(item),
      );
      return new PaginationResponse({
        ...data.frRadiationProtects,
        items,
      });
    });

const readFrRadiationProtectQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrRadiationProtectQuery.getFrRadiationProtectQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frRadiationProtects.items.map(
        (item) => new FrRadiationProtectResponse(item),
      );
      return new PaginationResponse({
        ...data.frRadiationProtects,
        items,
      });
    });

export default {
  readFrRadiationProtect,
  readFrRadiationProtectById,

  readFrRadiationProtectPagination,
  readFrRadiationProtectQueryPagination,
};

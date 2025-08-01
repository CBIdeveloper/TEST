import apolloInstance from '../../apollo/apolloInstance';

import FrChemicalProtectQuery from '../../graphql/FrChemicalProtect/FrChemicalProtectQuery';
import FrChemicalProtectResponse from '../../../dataModels/FrChemicalProtect/FrChemicalProtectResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrChemicalProtect = () =>
  apolloInstance
    .query({
      query: FrChemicalProtectQuery.getFrChemicalProtect,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frChemicalProtects.items.map(
        (item) => new FrChemicalProtectResponse(item),
      );
    });

const readFrChemicalProtectById = (id) =>
  apolloInstance
    .query({
      query: FrChemicalProtectQuery.getFrChemicalProtectById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrChemicalProtectResponse(data.frChemicalProtects.items[0]);
    });

const readFrChemicalProtectPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrChemicalProtectQuery.getFrChemicalProtectPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frChemicalProtects.items.map(
        (item) => new FrChemicalProtectResponse(item),
      );
      return new PaginationResponse({
        ...data.frChemicalProtects,
        items,
      });
    });

const readFrChemicalProtectQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrChemicalProtectQuery.getFrChemicalProtectQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frChemicalProtects.items.map(
        (item) => new FrChemicalProtectResponse(item),
      );
      return new PaginationResponse({
        ...data.frChemicalProtects,
        items,
      });
    });

export default {
  readFrChemicalProtect,
  readFrChemicalProtectById,

  readFrChemicalProtectPagination,
  readFrChemicalProtectQueryPagination,
};

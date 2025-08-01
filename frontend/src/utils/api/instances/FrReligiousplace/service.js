import apolloInstance from '../../apollo/apolloInstance';

import FrReligiousplaceQuery from '../../graphql/FrReligiousplace/FrReligiousplaceQuery';
import FrReligiousplaceResponse from '../../../dataModels/FrReligiousplace/FrReligiousplaceResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrReligiousplace = () =>
  apolloInstance
    .query({
      query: FrReligiousplaceQuery.getFrReligiousplace,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frReligiousplaces.items.map(
        (item) => new FrReligiousplaceResponse(item),
      );
    });

const readFrReligiousplaceById = (id) =>
  apolloInstance
    .query({
      query: FrReligiousplaceQuery.getFrReligiousplaceById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrReligiousplaceResponse(data.frReligiousplaces.items[0]);
    });

const readFrReligiousplacePagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrReligiousplaceQuery.getFrReligiousplacePagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frReligiousplaces.items.map(
        (item) => new FrReligiousplaceResponse(item),
      );
      return new PaginationResponse({
        ...data.frReligiousplaces,
        items,
      });
    });

const readFrReligiousplaceQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrReligiousplaceQuery.getFrReligiousplaceQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frReligiousplaces.items.map(
        (item) => new FrReligiousplaceResponse(item),
      );
      return new PaginationResponse({
        ...data.frReligiousplaces,
        items,
      });
    });

export default {
  readFrReligiousplace,
  readFrReligiousplaceById,

  readFrReligiousplacePagination,
  readFrReligiousplaceQueryPagination,
};

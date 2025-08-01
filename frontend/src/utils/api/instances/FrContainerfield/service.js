import apolloInstance from '../../apollo/apolloInstance';

import FrContainerfieldQuery from '../../graphql/FrContainerfield/FrContainerfieldQuery';
import FrContainerfieldResponse from '../../../dataModels/FrContainerfield/FrContainerfieldResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrContainerfield = () =>
  apolloInstance
    .query({
      query: FrContainerfieldQuery.getFrContainerfield,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frContainerfields.items.map(
        (item) => new FrContainerfieldResponse(item),
      );
    });

const readFrContainerfieldById = (id) =>
  apolloInstance
    .query({
      query: FrContainerfieldQuery.getFrContainerfieldById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrContainerfieldResponse(data.frContainerfields.items[0]);
    });

const readFrContainerfieldPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrContainerfieldQuery.getFrContainerfieldPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frContainerfields.items.map(
        (item) => new FrContainerfieldResponse(item),
      );
      return new PaginationResponse({
        ...data.frContainerfields,
        items,
      });
    });

const readFrContainerfieldQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrContainerfieldQuery.getFrContainerfieldQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frContainerfields.items.map(
        (item) => new FrContainerfieldResponse(item),
      );
      return new PaginationResponse({
        ...data.frContainerfields,
        items,
      });
    });

export default {
  readFrContainerfield,
  readFrContainerfieldById,

  readFrContainerfieldPagination,
  readFrContainerfieldQueryPagination,
};

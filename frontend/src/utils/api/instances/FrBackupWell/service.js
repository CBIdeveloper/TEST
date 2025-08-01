import apolloInstance from '../../apollo/apolloInstance';

import FrBackupWellQuery from '../../graphql/FrBackupWell/FrBackupWellQuery';
import FrBackupWellResponse from '../../../dataModels/FrBackupWell/FrBackupWellResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrBackupWell = () =>
  apolloInstance
    .query({
      query: FrBackupWellQuery.getFrBackupWell,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frBackupWells.items.map(
        (item) => new FrBackupWellResponse(item),
      );
    });

const readFrBackupWellById = (id) =>
  apolloInstance
    .query({
      query: FrBackupWellQuery.getFrBackupWellById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrBackupWellResponse(data.frBackupWells.items[0]);
    });

const readFrBackupWellPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrBackupWellQuery.getFrBackupWellPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frBackupWells.items.map(
        (item) => new FrBackupWellResponse(item),
      );
      return new PaginationResponse({
        ...data.frBackupWells,
        items,
      });
    });

const readFrBackupWellQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrBackupWellQuery.getFrBackupWellQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frBackupWells.items.map(
        (item) => new FrBackupWellResponse(item),
      );
      return new PaginationResponse({
        ...data.frBackupWells,
        items,
      });
    });

export default {
  readFrBackupWell,
  readFrBackupWellById,

  readFrBackupWellPagination,
  readFrBackupWellQueryPagination,
};

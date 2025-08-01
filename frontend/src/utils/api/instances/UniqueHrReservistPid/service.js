import apolloInstance from '../../apollo/apolloInstance';

import UniqueHrReservistPidQuery from '../../graphql/UniqueHrReservistPid/UniqueHrReservistPidQuery';
import UniqueHrReservistPidResponse from '../../../dataModels/UniqueHrReservistPid/UniqueHrReservistPidResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readUniqueHrReservistPid = () =>
  apolloInstance
    .query({
      query: UniqueHrReservistPidQuery.getUniqueHrReservistPid,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrReservistPids.items.map(
        (item) => new UniqueHrReservistPidResponse(item),
      );
    });

const readUniqueHrReservistPidPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrReservistPidQuery.getUniqueHrReservistPidPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrReservistPids.items.map(
        (item) => new UniqueHrReservistPidResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrReservistPids,
        items,
      });
    });

const readUniqueHrReservistPidQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrReservistPidQuery.getUniqueHrReservistPidQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrReservistPids.items.map(
        (item) => new UniqueHrReservistPidResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrReservistPids,
        items,
      });
    });

export default {
  readUniqueHrReservistPid,

  readUniqueHrReservistPidPagination,
  readUniqueHrReservistPidQueryPagination,
};

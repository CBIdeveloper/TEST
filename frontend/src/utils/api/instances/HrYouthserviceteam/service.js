import apolloInstance from '../../apollo/apolloInstance';

import HrYouthserviceteamQuery from '../../graphql/HrYouthserviceteam/HrYouthserviceteamQuery';
import HrYouthserviceteamResponse from '../../../dataModels/HrYouthserviceteam/HrYouthserviceteamResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrYouthserviceteamQuery from '../../graphql/UniqueHrYouthserviceteam/UniqueHrYouthserviceteamQuery';

const readHrYouthserviceteam = () =>
  apolloInstance
    .query({
      query: HrYouthserviceteamQuery.getHrYouthserviceteam,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrYouthserviceteams.items.map(
        (item) => new HrYouthserviceteamResponse(item),
      );
    });

const readHrYouthserviceteamById = (id) =>
  apolloInstance
    .query({
      query: HrYouthserviceteamQuery.getHrYouthserviceteamById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrYouthserviceteamResponse(data.hrYouthserviceteams.items[0]);
    });

const readHrYouthserviceteamPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrYouthserviceteamQuery.getHrYouthserviceteamPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrYouthserviceteams.items.map(
        (item) => new HrYouthserviceteamResponse(item),
      );
      return new PaginationResponse({
        ...data.hrYouthserviceteams,
        items,
      });
    });

const readHrYouthserviceteamQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrYouthserviceteamQuery.getHrYouthserviceteamQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrYouthserviceteams.items.map(
        (item) => new HrYouthserviceteamResponse(item),
      );
      return new PaginationResponse({
        ...data.hrYouthserviceteams,
        items,
      });
    });

const readUniqueHrYouthserviceteam = () =>
  apolloInstance
    .query({
      query: UniqueHrYouthserviceteamQuery.getUniqueHrYouthserviceteam,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrYouthserviceteams.items.map(
        (item) => new HrYouthserviceteamResponse(item),
      );
    });

const readUniqueHrYouthserviceteamById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrYouthserviceteamQuery.getUniqueHrYouthserviceteamById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrYouthserviceteamResponse(
        data.uniqueHrYouthserviceteams.items[0],
      );
    });

const readUniqueHrYouthserviceteamPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrYouthserviceteamQuery.getUniqueHrYouthserviceteamPagination({
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrYouthserviceteams.items.map(
        (item) => new HrYouthserviceteamResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrYouthserviceteams,
        items,
      });
    });

const readUniqueHrYouthserviceteamQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrYouthserviceteamQuery.getUniqueHrYouthserviceteamQueryPagination(
          {
            query,
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrYouthserviceteams.items.map(
        (item) => new HrYouthserviceteamResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrYouthserviceteams,
        items,
      });
    });

export default {
  readHrYouthserviceteam,
  readHrYouthserviceteamById,

  readHrYouthserviceteamPagination,
  readHrYouthserviceteamQueryPagination,

  readUniqueHrYouthserviceteam,
  readUniqueHrYouthserviceteamById,

  readUniqueHrYouthserviceteamPagination,
  readUniqueHrYouthserviceteamQueryPagination,
};

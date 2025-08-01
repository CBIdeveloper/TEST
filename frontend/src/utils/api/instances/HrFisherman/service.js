import apolloInstance from '../../apollo/apolloInstance';

import HrFishermanQuery from '../../graphql/HrFisherman/HrFishermanQuery';
import HrFishermanResponse from '../../../dataModels/HrFisherman/HrFishermanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrFishermanQuery from '../../graphql/UniqueHrFisherman/UniqueHrFishermanQuery';

const readHrFisherman = () =>
  apolloInstance
    .query({
      query: HrFishermanQuery.getHrFisherman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrFishermen.items.map(
        (item) => new HrFishermanResponse(item),
      );
    });

const readHrFishermanById = (id) =>
  apolloInstance
    .query({
      query: HrFishermanQuery.getHrFishermanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrFishermanResponse(data.hrFishermen.items[0]);
    });

const readHrFishermanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrFishermanQuery.getHrFishermanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrFishermen.items.map(
        (item) => new HrFishermanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrFishermen,
        items,
      });
    });

const readHrFishermanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrFishermanQuery.getHrFishermanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrFishermen.items.map(
        (item) => new HrFishermanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrFishermen,
        items,
      });
    });

const readUniqueHrFisherman = () =>
  apolloInstance
    .query({
      query: UniqueHrFishermanQuery.getUniqueHrFisherman,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrFishermen.items.map(
        (item) => new HrFishermanResponse(item),
      );
    });

const readUniqueHrFishermanById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrFishermanQuery.getUniqueHrFishermanById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrFishermanResponse(data.uniqueHrFishermen.items[0]);
    });

const readUniqueHrFishermanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrFishermanQuery.getUniqueHrFishermanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrFishermen.items.map(
        (item) => new HrFishermanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrFishermen,
        items,
      });
    });

const readUniqueHrFishermanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrFishermanQuery.getUniqueHrFishermanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrFishermen.items.map(
        (item) => new HrFishermanResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrFishermen,
        items,
      });
    });

export default {
  readHrFisherman,
  readHrFishermanById,

  readHrFishermanPagination,
  readHrFishermanQueryPagination,

  readUniqueHrFisherman,
  readUniqueHrFishermanById,

  readUniqueHrFishermanPagination,
  readUniqueHrFishermanQueryPagination,
};

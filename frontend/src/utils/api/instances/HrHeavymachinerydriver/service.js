import apolloInstance from '../../apollo/apolloInstance';

import HrHeavymachinerydriverQuery from '../../graphql/HrHeavymachinerydriver/HrHeavymachinerydriverQuery';
import HrHeavymachinerydriverResponse from '../../../dataModels/HrHeavymachinerydriver/HrHeavymachinerydriverResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrHeavymachinerydriverQuery from '../../graphql/UniqueHrHeavymachinerydriver/UniqueHrHeavymachinerydriverQuery';

const readHrHeavymachinerydriver = () =>
  apolloInstance
    .query({
      query: HrHeavymachinerydriverQuery.getHrHeavymachinerydriver,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrHeavymachinerydrivers.items.map(
        (item) => new HrHeavymachinerydriverResponse(item),
      );
    });

const readHrHeavymachinerydriverById = (id) =>
  apolloInstance
    .query({
      query: HrHeavymachinerydriverQuery.getHrHeavymachinerydriverById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrHeavymachinerydriverResponse(
        data.hrHeavymachinerydrivers.items[0],
      );
    });

const readHrHeavymachinerydriverPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrHeavymachinerydriverQuery.getHrHeavymachinerydriverPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrHeavymachinerydrivers.items.map(
        (item) => new HrHeavymachinerydriverResponse(item),
      );
      return new PaginationResponse({
        ...data.hrHeavymachinerydrivers,
        items,
      });
    });

const readHrHeavymachinerydriverQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        HrHeavymachinerydriverQuery.getHrHeavymachinerydriverQueryPagination({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrHeavymachinerydrivers.items.map(
        (item) => new HrHeavymachinerydriverResponse(item),
      );
      return new PaginationResponse({
        ...data.hrHeavymachinerydrivers,
        items,
      });
    });

const readUniqueHrHeavymachinerydriver = () =>
  apolloInstance
    .query({
      query: UniqueHrHeavymachinerydriverQuery.getUniqueHrHeavymachinerydriver,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrHeavymachinerydrivers.items.map(
        (item) => new HrHeavymachinerydriverResponse(item),
      );
    });

const readUniqueHrHeavymachinerydriverById = (id) =>
  apolloInstance
    .query({
      query:
        UniqueHrHeavymachinerydriverQuery.getUniqueHrHeavymachinerydriverById(
          id,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrHeavymachinerydriverResponse(
        data.uniqueHrHeavymachinerydrivers.items[0],
      );
    });

const readUniqueHrHeavymachinerydriverPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrHeavymachinerydriverQuery.getUniqueHrHeavymachinerydriverPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrHeavymachinerydrivers.items.map(
        (item) => new HrHeavymachinerydriverResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrHeavymachinerydrivers,
        items,
      });
    });

const readUniqueHrHeavymachinerydriverQueryPagination = ({
  query,
  take,
  skip,
}) =>
  apolloInstance
    .query({
      query:
        UniqueHrHeavymachinerydriverQuery.getUniqueHrHeavymachinerydriverQueryPagination(
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
      const items = data.uniqueHrHeavymachinerydrivers.items.map(
        (item) => new HrHeavymachinerydriverResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrHeavymachinerydrivers,
        items,
      });
    });

export default {
  readHrHeavymachinerydriver,
  readHrHeavymachinerydriverById,

  readHrHeavymachinerydriverPagination,
  readHrHeavymachinerydriverQueryPagination,

  readUniqueHrHeavymachinerydriver,
  readUniqueHrHeavymachinerydriverById,

  readUniqueHrHeavymachinerydriverPagination,
  readUniqueHrHeavymachinerydriverQueryPagination,
};

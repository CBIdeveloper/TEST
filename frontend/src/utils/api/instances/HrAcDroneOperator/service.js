import apolloInstance from '../../apollo/apolloInstance';

import HrAcDroneOperatorQuery from '../../graphql/HrAcDroneOperator/HrAcDroneOperatorQuery';
import HrAcDroneOperatorResponse from '../../../dataModels/HrAcDroneOperator/HrAcDroneOperatorResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrAcDroneOperatorQuery from '../../graphql/UniqueHrAcDroneOperator/UniqueHrAcDroneOperatorQuery';

const readHrAcDroneOperator = () =>
  apolloInstance
    .query({
      query: HrAcDroneOperatorQuery.getHrAcDroneOperator,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrAcDroneOperators.items.map(
        (item) => new HrAcDroneOperatorResponse(item),
      );
    });

const readHrAcDroneOperatorById = (id) =>
  apolloInstance
    .query({
      query: HrAcDroneOperatorQuery.getHrAcDroneOperatorById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrAcDroneOperatorResponse(data.hrAcDroneOperators.items[0]);
    });

const readHrAcDroneOperatorPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrAcDroneOperatorQuery.getHrAcDroneOperatorPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrAcDroneOperators.items.map(
        (item) => new HrAcDroneOperatorResponse(item),
      );
      return new PaginationResponse({
        ...data.hrAcDroneOperators,
        items,
      });
    });

const readHrAcDroneOperatorQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrAcDroneOperatorQuery.getHrAcDroneOperatorQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrAcDroneOperators.items.map(
        (item) => new HrAcDroneOperatorResponse(item),
      );
      return new PaginationResponse({
        ...data.hrAcDroneOperators,
        items,
      });
    });

const readUniqueHrAcDroneOperator = () =>
  apolloInstance
    .query({
      query: UniqueHrAcDroneOperatorQuery.getUniqueHrAcDroneOperator,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrAcDroneOperators.items.map(
        (item) => new HrAcDroneOperatorResponse(item),
      );
    });

const readUniqueHrAcDroneOperatorById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrAcDroneOperatorQuery.getUniqueHrAcDroneOperatorById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrAcDroneOperatorResponse(
        data.uniqueHrAcDroneOperators.items[0],
      );
    });

const readUniqueHrAcDroneOperatorPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrAcDroneOperatorQuery.getUniqueHrAcDroneOperatorPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrAcDroneOperators.items.map(
        (item) => new HrAcDroneOperatorResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrAcDroneOperators,
        items,
      });
    });

const readUniqueHrAcDroneOperatorQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        UniqueHrAcDroneOperatorQuery.getUniqueHrAcDroneOperatorQueryPagination({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrAcDroneOperators.items.map(
        (item) => new HrAcDroneOperatorResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrAcDroneOperators,
        items,
      });
    });

export default {
  readHrAcDroneOperator,
  readHrAcDroneOperatorById,

  readHrAcDroneOperatorPagination,
  readHrAcDroneOperatorQueryPagination,

  readUniqueHrAcDroneOperator,
  readUniqueHrAcDroneOperatorById,

  readUniqueHrAcDroneOperatorPagination,
  readUniqueHrAcDroneOperatorQueryPagination,
};

import apolloInstance from '../../apollo/apolloInstance';

import HrVehicledriverQuery from '../../graphql/HrVehicledriver/HrVehicledriverQuery';
import HrVehicledriverResponse from '../../../dataModels/HrVehicledriver/HrVehicledriverResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';
import UniqueHrVehicledriverQuery from '../../graphql/UniqueHrVehicledriver/UniqueHrVehicledriverQuery';

const readHrVehicledriver = () =>
  apolloInstance
    .query({
      query: HrVehicledriverQuery.getHrVehicledriver,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrVehicledrivers.items.map(
        (item) => new HrVehicledriverResponse(item),
      );
    });

const readHrVehicledriverById = (id) =>
  apolloInstance
    .query({
      query: HrVehicledriverQuery.getHrVehicledriverById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrVehicledriverResponse(data.hrVehicledrivers.items[0]);
    });

const readHrVehicledriverPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrVehicledriverQuery.getHrVehicledriverPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrVehicledrivers.items.map(
        (item) => new HrVehicledriverResponse(item),
      );
      return new PaginationResponse({
        ...data.hrVehicledrivers,
        items,
      });
    });

const readHrVehicledriverQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrVehicledriverQuery.getHrVehicledriverQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrVehicledrivers.items.map(
        (item) => new HrVehicledriverResponse(item),
      );
      return new PaginationResponse({
        ...data.hrVehicledrivers,
        items,
      });
    });

const readUniqueHrVehicledriver = () =>
  apolloInstance
    .query({
      query: UniqueHrVehicledriverQuery.getUniqueHrVehicledriver,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.uniqueHrVehicledrivers.items.map(
        (item) => new HrVehicledriverResponse(item),
      );
    });

const readUniqueHrVehicledriverById = (id) =>
  apolloInstance
    .query({
      query: UniqueHrVehicledriverQuery.getUniqueHrVehicledriverById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new HrVehicledriverResponse(data.uniqueHrVehicledrivers.items[0]);
    });

const readUniqueHrVehicledriverPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrVehicledriverQuery.getUniqueHrVehicledriverPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.uniqueHrVehicledrivers.items.map(
        (item) => new HrVehicledriverResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrVehicledrivers,
        items,
      });
    });

const readUniqueHrVehicledriverQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: UniqueHrVehicledriverQuery.getUniqueHrVehicledriverQueryPagination(
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
      const items = data.uniqueHrVehicledrivers.items.map(
        (item) => new HrVehicledriverResponse(item),
      );
      return new PaginationResponse({
        ...data.uniqueHrVehicledrivers,
        items,
      });
    });

export default {
  readHrVehicledriver,
  readHrVehicledriverById,

  readHrVehicledriverPagination,
  readHrVehicledriverQueryPagination,

  readUniqueHrVehicledriver,
  readUniqueHrVehicledriverById,

  readUniqueHrVehicledriverPagination,
  readUniqueHrVehicledriverQueryPagination,
};

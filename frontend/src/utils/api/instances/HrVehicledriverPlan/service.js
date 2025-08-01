import apolloInstance from '../../apollo/apolloInstance';

import HrVehicledriverPlanQuery from '../../graphql/HrVehicledriverPlan/HrVehicledriverPlanQuery';
import HrVehicledriverPlanResponse from '../../../dataModels/HrVehicledriverPlan/HrVehicledriverPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrVehicledriverPlan = () =>
  apolloInstance
    .query({
      query: HrVehicledriverPlanQuery.getHrVehicledriverPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrVehicledriverPlans.items.map(
        (item) => new HrVehicledriverPlanResponse(item),
      );
    });

const readHrVehicledriverPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrVehicledriverPlanQuery.getHrVehicledriverPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrVehicledriverPlans.items.map(
        (item) => new HrVehicledriverPlanResponse(item),
      );
    });

const readHrVehicledriverPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrVehicledriverPlanQuery.getHrVehicledriverPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrVehicledriverPlans.items.map(
        (item) => new HrVehicledriverPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrVehicledriverPlans,
        items,
      });
    });

const readHrVehicledriverPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrVehicledriverPlanQuery.getHrVehicledriverPlanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrVehicledriverPlans.items.map(
        (item) => new HrVehicledriverPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrVehicledriverPlans,
        items,
      });
    });

export default {
  readHrVehicledriverPlan,
  readHrVehicledriverPlanByPid,

  readHrVehicledriverPlanPagination,
  readHrVehicledriverPlanQueryPagination,
};

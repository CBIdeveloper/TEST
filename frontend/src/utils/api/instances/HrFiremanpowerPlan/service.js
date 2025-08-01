import apolloInstance from '../../apollo/apolloInstance';

import HrFiremanpowerPlanQuery from '../../graphql/HrFiremanpowerPlan/HrFiremanpowerPlanQuery';
import HrFiremanpowerPlanResponse from '../../../dataModels/HrFiremanpowerPlan/HrFiremanpowerPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrFiremanpowerPlan = () =>
  apolloInstance
    .query({
      query: HrFiremanpowerPlanQuery.getHrFiremanpowerPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrFiremanpowerPlans.items.map(
        (item) => new HrFiremanpowerPlanResponse(item),
      );
    });

const readHrFiremanpowerPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrFiremanpowerPlanQuery.getHrFiremanpowerPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrFiremanpowerPlans.items.map(
        (item) => new HrFiremanpowerPlanResponse(item),
      );
    });

const readHrFiremanpowerPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrFiremanpowerPlanQuery.getHrFiremanpowerPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrFiremanpowerPlans.items.map(
        (item) => new HrFiremanpowerPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrFiremanpowerPlans,
        items,
      });
    });

const readHrFiremanpowerPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrFiremanpowerPlanQuery.getHrFiremanpowerPlanQueryPagination(
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
      const items = data.hrFiremanpowerPlans.items.map(
        (item) => new HrFiremanpowerPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrFiremanpowerPlans,
        items,
      });
    });

export default {
  readHrFiremanpowerPlan,
  readHrFiremanpowerPlanByPid,

  readHrFiremanpowerPlanPagination,
  readHrFiremanpowerPlanQueryPagination,
};

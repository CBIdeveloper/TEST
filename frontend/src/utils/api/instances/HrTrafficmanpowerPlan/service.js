import apolloInstance from '../../apollo/apolloInstance';

import HrTrafficmanpowerPlanQuery from '../../graphql/HrTrafficmanpowerPlan/HrTrafficmanpowerPlanQuery';
import HrTrafficmanpowerPlanResponse from '../../../dataModels/HrTrafficmanpowerPlan/HrTrafficmanpowerPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrTrafficmanpowerPlan = () =>
  apolloInstance
    .query({
      query: HrTrafficmanpowerPlanQuery.getHrTrafficmanpowerPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrTrafficmanpowerPlans.items.map(
        (item) => new HrTrafficmanpowerPlanResponse(item),
      );
    });

const readHrTrafficmanpowerPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrTrafficmanpowerPlanQuery.getHrTrafficmanpowerPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrTrafficmanpowerPlans.items.map(
        (item) => new HrTrafficmanpowerPlanResponse(item),
      );
    });

const readHrTrafficmanpowerPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrTrafficmanpowerPlanQuery.getHrTrafficmanpowerPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrTrafficmanpowerPlans.items.map(
        (item) => new HrTrafficmanpowerPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrTrafficmanpowerPlans,
        items,
      });
    });

const readHrTrafficmanpowerPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrTrafficmanpowerPlanQuery.getHrTrafficmanpowerPlanQueryPagination(
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
      const items = data.hrTrafficmanpowerPlans.items.map(
        (item) => new HrTrafficmanpowerPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrTrafficmanpowerPlans,
        items,
      });
    });

export default {
  readHrTrafficmanpowerPlan,
  readHrTrafficmanpowerPlanByPid,

  readHrTrafficmanpowerPlanPagination,
  readHrTrafficmanpowerPlanQueryPagination,
};

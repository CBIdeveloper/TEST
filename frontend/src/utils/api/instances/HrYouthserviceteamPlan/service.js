import apolloInstance from '../../apollo/apolloInstance';

import HrYouthserviceteamPlanQuery from '../../graphql/HrYouthserviceteamPlan/HrYouthserviceteamPlanQuery';
import HrYouthserviceteamPlanResponse from '../../../dataModels/HrYouthserviceteamPlan/HrYouthserviceteamPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrYouthserviceteamPlan = () =>
  apolloInstance
    .query({
      query: HrYouthserviceteamPlanQuery.getHrYouthserviceteamPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrYouthserviceteamPlans.items.map(
        (item) => new HrYouthserviceteamPlanResponse(item),
      );
    });

const readHrYouthserviceteamPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrYouthserviceteamPlanQuery.getHrYouthserviceteamPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrYouthserviceteamPlans.items.map(
        (item) => new HrYouthserviceteamPlanResponse(item),
      );
    });

const readHrYouthserviceteamPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrYouthserviceteamPlanQuery.getHrYouthserviceteamPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrYouthserviceteamPlans.items.map(
        (item) => new HrYouthserviceteamPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrYouthserviceteamPlans,
        items,
      });
    });

const readHrYouthserviceteamPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        HrYouthserviceteamPlanQuery.getHrYouthserviceteamPlanQueryPagination({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrYouthserviceteamPlans.items.map(
        (item) => new HrYouthserviceteamPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrYouthserviceteamPlans,
        items,
      });
    });

export default {
  readHrYouthserviceteamPlan,
  readHrYouthserviceteamPlanByPid,

  readHrYouthserviceteamPlanPagination,
  readHrYouthserviceteamPlanQueryPagination,
};

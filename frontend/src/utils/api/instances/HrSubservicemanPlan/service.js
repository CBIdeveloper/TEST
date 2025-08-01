import apolloInstance from '../../apollo/apolloInstance';

import HrSubservicemanPlanQuery from '../../graphql/HrSubservicemanPlan/HrSubservicemanPlanQuery';
import HrSubservicemanPlanResponse from '../../../dataModels/HrSubservicemanPlan/HrSubservicemanPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrSubservicemanPlan = () =>
  apolloInstance
    .query({
      query: HrSubservicemanPlanQuery.getHrSubservicemanPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrSubservicemanPlans.items.map(
        (item) => new HrSubservicemanPlanResponse(item),
      );
    });

const readHrSubservicemanPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrSubservicemanPlanQuery.getHrSubservicemanPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrSubservicemanPlans.items.map(
        (item) => new HrSubservicemanPlanResponse(item),
      );
    });

const readHrSubservicemanPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrSubservicemanPlanQuery.getHrSubservicemanPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrSubservicemanPlans.items.map(
        (item) => new HrSubservicemanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrSubservicemanPlans,
        items,
      });
    });

const readHrSubservicemanPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrSubservicemanPlanQuery.getHrSubservicemanPlanQueryPagination(
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
      const items = data.hrSubservicemanPlans.items.map(
        (item) => new HrSubservicemanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrSubservicemanPlans,
        items,
      });
    });

export default {
  readHrSubservicemanPlan,
  readHrSubservicemanPlanByPid,

  readHrSubservicemanPlanPagination,
  readHrSubservicemanPlanQueryPagination,
};

import apolloInstance from '../../apollo/apolloInstance';

import HrMajorproductmanpowerPlanQuery from '../../graphql/HrMajorproductmanpowerPlan/HrMajorproductmanpowerPlanQuery';
import HrMajorproductmanpowerPlanResponse from '../../../dataModels/HrMajorproductmanpowerPlan/HrMajorproductmanpowerPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrMajorproductmanpowerPlan = () =>
  apolloInstance
    .query({
      query: HrMajorproductmanpowerPlanQuery.getHrMajorproductmanpowerPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrMajorproductmanpowerPlans.items.map(
        (item) => new HrMajorproductmanpowerPlanResponse(item),
      );
    });

const readHrMajorproductmanpowerPlanByPid = (id) =>
  apolloInstance
    .query({
      query:
        HrMajorproductmanpowerPlanQuery.getHrMajorproductmanpowerPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrMajorproductmanpowerPlans.items.map(
        (item) => new HrMajorproductmanpowerPlanResponse(item),
      );
    });

const readHrMajorproductmanpowerPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        HrMajorproductmanpowerPlanQuery.getHrMajorproductmanpowerPlanPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMajorproductmanpowerPlans.items.map(
        (item) => new HrMajorproductmanpowerPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMajorproductmanpowerPlans,
        items,
      });
    });

const readHrMajorproductmanpowerPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        HrMajorproductmanpowerPlanQuery.getHrMajorproductmanpowerPlanQueryPagination(
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
      const items = data.hrMajorproductmanpowerPlans.items.map(
        (item) => new HrMajorproductmanpowerPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMajorproductmanpowerPlans,
        items,
      });
    });

export default {
  readHrMajorproductmanpowerPlan,
  readHrMajorproductmanpowerPlanByPid,

  readHrMajorproductmanpowerPlanPagination,
  readHrMajorproductmanpowerPlanQueryPagination,
};

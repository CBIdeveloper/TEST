import apolloInstance from '../../apollo/apolloInstance';

import HrCarRepairmanPlanQuery from '../../graphql/HrCarRepairmanPlan/HrCarRepairmanPlanQuery';
import HrCarRepairmanPlanResponse from '../../../dataModels/HrCarRepairmanPlan/HrCarRepairmanPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrCarRepairmanPlan = () =>
  apolloInstance
    .query({
      query: HrCarRepairmanPlanQuery.getHrCarRepairmanPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrCarRepairmanPlans.items.map(
        (item) => new HrCarRepairmanPlanResponse(item),
      );
    });

const readHrCarRepairmanPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrCarRepairmanPlanQuery.getHrCarRepairmanPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrCarRepairmanPlans.items.map(
        (item) => new HrCarRepairmanPlanResponse(item),
      );
    });

const readHrCarRepairmanPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrCarRepairmanPlanQuery.getHrCarRepairmanPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrCarRepairmanPlans.items.map(
        (item) => new HrCarRepairmanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrCarRepairmanPlans,
        items,
      });
    });

const readHrCarRepairmanPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrCarRepairmanPlanQuery.getHrCarRepairmanPlanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrCarRepairmanPlans.items.map(
        (item) => new HrCarRepairmanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrCarRepairmanPlans,
        items,
      });
    });

export default {
  readHrCarRepairmanPlan,
  readHrCarRepairmanPlanByPid,

  readHrCarRepairmanPlanPagination,
  readHrCarRepairmanPlanQueryPagination,
};

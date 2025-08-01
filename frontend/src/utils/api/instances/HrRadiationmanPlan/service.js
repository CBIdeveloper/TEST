import apolloInstance from '../../apollo/apolloInstance';

import HrRadiationmanPlanQuery from '../../graphql/HrRadiationmanPlan/HrRadiationmanPlanQuery';
import HrRadiationmanPlanResponse from '../../../dataModels/HrRadiationmanPlan/HrRadiationmanPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrRadiationmanPlan = () =>
  apolloInstance
    .query({
      query: HrRadiationmanPlanQuery.getHrRadiationmanPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrRadiationmanPlans.items.map(
        (item) => new HrRadiationmanPlanResponse(item),
      );
    });

const readHrRadiationmanPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrRadiationmanPlanQuery.getHrRadiationmanPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrRadiationmanPlans.items.map(
        (item) => new HrRadiationmanPlanResponse(item),
      );
    });

const readHrRadiationmanPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrRadiationmanPlanQuery.getHrRadiationmanPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrRadiationmanPlans.items.map(
        (item) => new HrRadiationmanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrRadiationmanPlans,
        items,
      });
    });

const readHrRadiationmanPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrRadiationmanPlanQuery.getHrRadiationmanPlanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrRadiationmanPlans.items.map(
        (item) => new HrRadiationmanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrRadiationmanPlans,
        items,
      });
    });

export default {
  readHrRadiationmanPlan,
  readHrRadiationmanPlanByPid,

  readHrRadiationmanPlanPagination,
  readHrRadiationmanPlanQueryPagination,
};

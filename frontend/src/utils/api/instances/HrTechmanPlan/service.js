import apolloInstance from '../../apollo/apolloInstance';

import HrTechmanPlanQuery from '../../graphql/HrTechmanPlan/HrTechmanPlanQuery';
import HrTechmanPlanResponse from '../../../dataModels/HrTechmanPlan/HrTechmanPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrTechmanPlan = () =>
  apolloInstance
    .query({
      query: HrTechmanPlanQuery.getHrTechmanPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrTechmanPlans.items.map(
        (item) => new HrTechmanPlanResponse(item),
      );
    });

const readHrTechmanPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrTechmanPlanQuery.getHrTechmanPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrTechmanPlans.items.map(
        (item) => new HrTechmanPlanResponse(item),
      );
    });

const readHrTechmanPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrTechmanPlanQuery.getHrTechmanPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrTechmanPlans.items.map(
        (item) => new HrTechmanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrTechmanPlans,
        items,
      });
    });

const readHrTechmanPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrTechmanPlanQuery.getHrTechmanPlanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrTechmanPlans.items.map(
        (item) => new HrTechmanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrTechmanPlans,
        items,
      });
    });

export default {
  readHrTechmanPlan,
  readHrTechmanPlanByPid,

  readHrTechmanPlanPagination,
  readHrTechmanPlanQueryPagination,
};

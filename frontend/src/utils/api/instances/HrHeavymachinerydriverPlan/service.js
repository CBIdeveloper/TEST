import apolloInstance from '../../apollo/apolloInstance';

import HrHeavymachinerydriverPlanQuery from '../../graphql/HrHeavymachinerydriverPlan/HrHeavymachinerydriverPlanQuery';
import HrHeavymachinerydriverPlanResponse from '../../../dataModels/HrHeavymachinerydriverPlan/HrHeavymachinerydriverPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrHeavymachinerydriverPlan = () =>
  apolloInstance
    .query({
      query: HrHeavymachinerydriverPlanQuery.getHrHeavymachinerydriverPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrHeavymachinerydriverPlans.items.map(
        (item) => new HrHeavymachinerydriverPlanResponse(item),
      );
    });

const readHrHeavymachinerydriverPlanByPid = (id) =>
  apolloInstance
    .query({
      query:
        HrHeavymachinerydriverPlanQuery.getHrHeavymachinerydriverPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrHeavymachinerydriverPlans.items.map(
        (item) => new HrHeavymachinerydriverPlanResponse(item),
      );
    });

const readHrHeavymachinerydriverPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        HrHeavymachinerydriverPlanQuery.getHrHeavymachinerydriverPlanPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrHeavymachinerydriverPlans.items.map(
        (item) => new HrHeavymachinerydriverPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrHeavymachinerydriverPlans,
        items,
      });
    });

const readHrHeavymachinerydriverPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        HrHeavymachinerydriverPlanQuery.getHrHeavymachinerydriverPlanQueryPagination(
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
      const items = data.hrHeavymachinerydriverPlans.items.map(
        (item) => new HrHeavymachinerydriverPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrHeavymachinerydriverPlans,
        items,
      });
    });

export default {
  readHrHeavymachinerydriverPlan,
  readHrHeavymachinerydriverPlanByPid,

  readHrHeavymachinerydriverPlanPagination,
  readHrHeavymachinerydriverPlanQueryPagination,
};

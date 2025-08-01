import apolloInstance from '../../apollo/apolloInstance';

import HrCivildefensemanpowerPlanQuery from '../../graphql/HrCivildefensemanpowerPlan/HrCivildefensemanpowerPlanQuery';
import HrCivildefensemanpowerPlanResponse from '../../../dataModels/HrCivildefensemanpowerPlan/HrCivildefensemanpowerPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrCivildefensemanpowerPlan = () =>
  apolloInstance
    .query({
      query: HrCivildefensemanpowerPlanQuery.getHrCivildefensemanpowerPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrCivildefensemanpowerPlans.items.map(
        (item) => new HrCivildefensemanpowerPlanResponse(item),
      );
    });

const readHrCivildefensemanpowerPlanByPid = (id) =>
  apolloInstance
    .query({
      query:
        HrCivildefensemanpowerPlanQuery.getHrCivildefensemanpowerPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrCivildefensemanpowerPlans.items.map(
        (item) => new HrCivildefensemanpowerPlanResponse(item),
      );
    });

const readHrCivildefensemanpowerPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query:
        HrCivildefensemanpowerPlanQuery.getHrCivildefensemanpowerPlanPagination(
          {
            take,
            skip,
          },
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrCivildefensemanpowerPlans.items.map(
        (item) => new HrCivildefensemanpowerPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrCivildefensemanpowerPlans,
        items,
      });
    });

const readHrCivildefensemanpowerPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        HrCivildefensemanpowerPlanQuery.getHrCivildefensemanpowerPlanQueryPagination(
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
      const items = data.hrCivildefensemanpowerPlans.items.map(
        (item) => new HrCivildefensemanpowerPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrCivildefensemanpowerPlans,
        items,
      });
    });

export default {
  readHrCivildefensemanpowerPlan,
  readHrCivildefensemanpowerPlanByPid,

  readHrCivildefensemanpowerPlanPagination,
  readHrCivildefensemanpowerPlanQueryPagination,
};

import apolloInstance from '../../apollo/apolloInstance';

import HrAcDroneOperatorPlanQuery from '../../graphql/HrAcDroneOperatorPlan/HrAcDroneOperatorPlanQuery';
import HrAcDroneOperatorPlanResponse from '../../../dataModels/HrAcDroneOperatorPlan/HrAcDroneOperatorPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrAcDroneOperatorPlan = () =>
  apolloInstance
    .query({
      query: HrAcDroneOperatorPlanQuery.getHrAcDroneOperatorPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrAcDroneOperatorPlans.items.map(
        (item) => new HrAcDroneOperatorPlanResponse(item),
      );
    });

const readHrAcDroneOperatorPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrAcDroneOperatorPlanQuery.getHrAcDroneOperatorPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrAcDroneOperatorPlans.items.map(
        (item) => new HrAcDroneOperatorPlanResponse(item),
      );
    });

const readHrAcDroneOperatorPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrAcDroneOperatorPlanQuery.getHrAcDroneOperatorPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrAcDroneOperatorPlans.items.map(
        (item) => new HrAcDroneOperatorPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrAcDroneOperatorPlans,
        items,
      });
    });

const readHrAcDroneOperatorPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrAcDroneOperatorPlanQuery.getHrAcDroneOperatorPlanQueryPagination(
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
      const items = data.hrAcDroneOperatorPlans.items.map(
        (item) => new HrAcDroneOperatorPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrAcDroneOperatorPlans,
        items,
      });
    });

export default {
  readHrAcDroneOperatorPlan,
  readHrAcDroneOperatorPlanByPid,

  readHrAcDroneOperatorPlanPagination,
  readHrAcDroneOperatorPlanQueryPagination,
};

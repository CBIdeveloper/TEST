import apolloInstance from '../../apollo/apolloInstance';

import HrMedicalmanPlanQuery from '../../graphql/HrMedicalmanPlan/HrMedicalmanPlanQuery';
import HrMedicalmanPlanResponse from '../../../dataModels/HrMedicalmanPlan/HrMedicalmanPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readHrMedicalmanPlan = () =>
  apolloInstance
    .query({
      query: HrMedicalmanPlanQuery.getHrMedicalmanPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrMedicalmanPlans.items.map(
        (item) => new HrMedicalmanPlanResponse(item),
      );
    });

const readHrMedicalmanPlanByPid = (id) =>
  apolloInstance
    .query({
      query: HrMedicalmanPlanQuery.getHrMedicalmanPlanByPid(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrMedicalmanPlans.items.map(
        (item) => new HrMedicalmanPlanResponse(item),
      );
    });

const readHrMedicalmanPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: HrMedicalmanPlanQuery.getHrMedicalmanPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMedicalmanPlans.items.map(
        (item) => new HrMedicalmanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMedicalmanPlans,
        items,
      });
    });

const readHrMedicalmanPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: HrMedicalmanPlanQuery.getHrMedicalmanPlanQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrMedicalmanPlans.items.map(
        (item) => new HrMedicalmanPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrMedicalmanPlans,
        items,
      });
    });

export default {
  readHrMedicalmanPlan,
  readHrMedicalmanPlanByPid,

  readHrMedicalmanPlanPagination,
  readHrMedicalmanPlanQueryPagination,
};

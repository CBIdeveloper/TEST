import apolloInstance from '../../apollo/apolloInstance';

import FrRadiationProtectPlanQuery from '../../graphql/FrRadiationProtectPlan/FrRadiationProtectPlanQuery';
import FrRadiationProtectPlanResponse from '../../../dataModels/FrRadiationProtectPlan/FrRadiationProtectPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrRadiationProtectPlan = () =>
  apolloInstance
    .query({
      query: FrRadiationProtectPlanQuery.getFrRadiationProtectPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrRadiationProtectPlans.items.map(
        (item) => new FrRadiationProtectPlanResponse(item),
      );
    });

const readFrRadiationProtectPlanByCompanyName = (companyName) =>
  apolloInstance
    .query({
      query:
        FrRadiationProtectPlanQuery.getFrRadiationProtectPlanByCompanyName(
          companyName,
        ),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrRadiationProtectPlans.items.map(
        (item) => new FrRadiationProtectPlanResponse(item),
      );
    });

const readFrRadiationProtectPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrRadiationProtectPlanQuery.getFrRadiationProtectPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrRadiationProtectPlans.items.map(
        (item) => new FrRadiationProtectPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrRadiationProtectPlans,
        items,
      });
    });

const readFrRadiationProtectPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        FrRadiationProtectPlanQuery.getFrRadiationProtectPlanQueryPagination({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrRadiationProtectPlans.items.map(
        (item) => new FrRadiationProtectPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrRadiationProtectPlans,
        items,
      });
    });

export default {
  readFrRadiationProtectPlan,
  readFrRadiationProtectPlanByCompanyName,

  readFrRadiationProtectPlanPagination,
  readFrRadiationProtectPlanQueryPagination,
};

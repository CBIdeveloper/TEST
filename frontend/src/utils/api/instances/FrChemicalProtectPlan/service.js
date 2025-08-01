import apolloInstance from '../../apollo/apolloInstance';

import FrChemicalProtectPlanQuery from '../../graphql/FrChemicalProtectPlan/FrChemicalProtectPlanQuery';
import FrChemicalProtectPlanResponse from '../../../dataModels/FrChemicalProtectPlan/FrChemicalProtectPlanResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrChemicalProtectPlan = () =>
  apolloInstance
    .query({
      query: FrChemicalProtectPlanQuery.getFrChemicalProtectPlan,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrChemicalProtectPlans.items.map(
        (item) => new FrChemicalProtectPlanResponse(item),
      );
    });

const readFrChemicalProtectPlanByName = (name) =>
  apolloInstance
    .query({
      query: FrChemicalProtectPlanQuery.getFrChemicalProtectPlanByName(name),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.hrChemicalProtectPlans.items.map(
        (item) => new FrChemicalProtectPlanResponse(item),
      );
    });

const readFrChemicalProtectPlanPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrChemicalProtectPlanQuery.getFrChemicalProtectPlanPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.hrChemicalProtectPlans.items.map(
        (item) => new FrChemicalProtectPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrChemicalProtectPlans,
        items,
      });
    });

const readFrChemicalProtectPlanQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrChemicalProtectPlanQuery.getFrChemicalProtectPlanQueryPagination(
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
      const items = data.hrChemicalProtectPlans.items.map(
        (item) => new FrChemicalProtectPlanResponse(item),
      );
      return new PaginationResponse({
        ...data.hrChemicalProtectPlans,
        items,
      });
    });

export default {
  readFrChemicalProtectPlan,
  readFrChemicalProtectPlanByName,

  readFrChemicalProtectPlanPagination,
  readFrChemicalProtectPlanQueryPagination,
};

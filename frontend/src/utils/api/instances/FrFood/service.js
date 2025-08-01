import apolloInstance from '../../apollo/apolloInstance';

import FrFoodQuery from '../../graphql/FrFood/FrFoodQuery';
import FrFoodResponse from '../../../dataModels/FrFood/FrFoodResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrFood = () =>
  apolloInstance
    .query({
      query: FrFoodQuery.getFrFood,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frFoods.items.map((item) => new FrFoodResponse(item));
    });

const readFrFoodById = (id) =>
  apolloInstance
    .query({
      query: FrFoodQuery.getFrFoodById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrFoodResponse(data.frFoods.items[0]);
    });

const readFrFoodPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrFoodQuery.getFrFoodPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frFoods.items.map((item) => new FrFoodResponse(item));
      return new PaginationResponse({
        ...data.frFoods,
        items,
      });
    });

const readFrFoodQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrFoodQuery.getFrFoodQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frFoods.items.map((item) => new FrFoodResponse(item));
      return new PaginationResponse({
        ...data.frFoods,
        items,
      });
    });

export default {
  readFrFood,
  readFrFoodById,

  readFrFoodPagination,
  readFrFoodQueryPagination,
};

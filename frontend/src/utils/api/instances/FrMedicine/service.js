import apolloInstance from '../../apollo/apolloInstance';

import FrMedicineQuery from '../../graphql/FrMedicine/FrMedicineQuery';
import FrMedicineResponse from '../../../dataModels/FrMedicine/FrMedicineResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrMedicine = () =>
  apolloInstance
    .query({
      query: FrMedicineQuery.getFrMedicine,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frMedicines.items.map((item) => new FrMedicineResponse(item));
    });

const readFrMedicineById = (id) =>
  apolloInstance
    .query({
      query: FrMedicineQuery.getFrMedicineById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrMedicineResponse(data.frMedicines.items[0]);
    });

const readFrMedicinePagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrMedicineQuery.getFrMedicinePagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frMedicines.items.map(
        (item) => new FrMedicineResponse(item),
      );
      return new PaginationResponse({
        ...data.frMedicines,
        items,
      });
    });

const readFrMedicineQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrMedicineQuery.getFrMedicineQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frMedicines.items.map(
        (item) => new FrMedicineResponse(item),
      );
      return new PaginationResponse({
        ...data.frMedicines,
        items,
      });
    });

export default {
  readFrMedicine,
  readFrMedicineById,

  readFrMedicinePagination,
  readFrMedicineQueryPagination,
};

import apolloInstance from '../../apollo/apolloInstance';

import FrSchoolQuery from '../../graphql/FrSchool/FrSchoolQuery';
import FrSchoolResponse from '../../../dataModels/FrSchool/FrSchoolResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readFrSchool = () =>
  apolloInstance
    .query({
      query: FrSchoolQuery.getFrSchool,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.frSchools.items.map((item) => new FrSchoolResponse(item));
    });

const readFrSchoolById = (id) =>
  apolloInstance
    .query({
      query: FrSchoolQuery.getFrSchoolById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new FrSchoolResponse(data.frSchools.items[0]);
    });

const readFrSchoolPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: FrSchoolQuery.getFrSchoolPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frSchools.items.map(
        (item) => new FrSchoolResponse(item),
      );
      return new PaginationResponse({
        ...data.frSchools,
        items,
      });
    });

const readFrSchoolQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: FrSchoolQuery.getFrSchoolQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.frSchools.items.map(
        (item) => new FrSchoolResponse(item),
      );
      return new PaginationResponse({
        ...data.frSchools,
        items,
      });
    });

export default {
  readFrSchool,
  readFrSchoolById,

  readFrSchoolPagination,
  readFrSchoolQueryPagination,
};

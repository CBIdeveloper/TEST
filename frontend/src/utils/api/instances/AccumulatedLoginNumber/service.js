import Router from './router';

import apolloInstance from '../../apollo/apolloInstance';
import { getRequest } from '../../axios/axiosMethod';

import AccumulatedLoginNumberQuery from '../../graphql/AccumulatedLoginNumber/AccumulatedLoginNumberQuery';
import AccumulatedLoginNumberResponse from '../../../dataModels/AccumulatedLoginNumber/AccumulatedLoginNumberResponse';

const readAccumulatedLoginNumber = () =>
  apolloInstance
    .query({
      query: AccumulatedLoginNumberQuery.getAccumulatedLoginNumber,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.accumulatedLoginNumbers.items.map(
        (item) => new AccumulatedLoginNumberResponse(item),
      );
    });

const getAccumulatedLoginNumber = () =>
  getRequest(Router.getAccumulatedLoginNumber).then(
    (response) => response.data.accumulated_login_number_count,
  );

export default {
  readAccumulatedLoginNumber,
  getAccumulatedLoginNumber,
};

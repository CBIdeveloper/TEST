import apolloInstance from '../../apollo/apolloInstance';

import SimpleSysUserAccountQuery from '../../graphql/SimpleSysUserAccountContact/SimpleSysUserAccountQuery';
import SimpleSysUserAccountResponse from '../../../dataModels/SimpleSysUserAccount/SimpleSysUserAccountResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readSysUserAccountContactQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountContactQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      // console.log(query,response)
      const items = data.simpleSysUserAccountContacts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
      return new PaginationResponse({
        ...data.simpleSysUserAccountContacts,
        items,
      });
    });

export default {
  readSysUserAccountContactQueryPagination,
};

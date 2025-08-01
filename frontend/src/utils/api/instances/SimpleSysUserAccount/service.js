import apolloInstance from '../../apollo/apolloInstance';

import SimpleSysUserAccountQuery from '../../graphql/SimpleSysUserAccount/SimpleSysUserAccountQuery';
import SimpleSysUserAccountResponse from '../../../dataModels/SimpleSysUserAccount/SimpleSysUserAccountResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readSysUserAccount = () =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccount,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
    });

const readSysUserAccountById = (id) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new SimpleSysUserAccountResponse(
        data.simpleSysUserAccounts.items[0],
      );
    });

const readSysUserAccountByFirstLevelAgency = (id) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountByFirstLevelAgency(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
    });

const readSysUserAccountBySecondaryAgency = (id) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountBySecondaryAgency(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
    });

const readSysUserAccountByCity = (id) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountByCity(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
    });

const readSysUserAccountByFirstLevelUnit = (id) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountByFirstlevelUnit(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
    });

const readSysUserAccountByMilitaryagency = (id) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountByMilitaryagency(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
    });

const readSysUserAccountByLevel = (id) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountByLevel(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
    });

const readSysUserAccountByPidAndName = ({ pid, name }) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountByPidAndName({
        pid,
        name,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
    });

const readSysUserAccountPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
      return new PaginationResponse({
        ...data.simpleSysUserAccounts,
        items,
      });
    });

const readSysUserAccountQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: SimpleSysUserAccountQuery.getSysUserAccountQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      // console.log(query,response)
      const items = data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
      return new PaginationResponse({
        ...data.simpleSysUserAccounts,
        items,
      });
    });

const readSysUserAccountQueryPaginationWithOrder = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query:
        SimpleSysUserAccountQuery.getSysUserAccountQueryPaginationWithOrder({
          query,
          take,
          skip,
        }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.simpleSysUserAccounts.items.map(
        (item) => new SimpleSysUserAccountResponse(item),
      );
      return new PaginationResponse({
        ...data.simpleSysUserAccounts,
        items,
      });
    });

export default {
  readSysUserAccount,
  readSysUserAccountById,
  readSysUserAccountByFirstLevelAgency,
  readSysUserAccountBySecondaryAgency,
  readSysUserAccountByCity,
  readSysUserAccountByFirstLevelUnit,
  readSysUserAccountByMilitaryagency,
  readSysUserAccountByLevel,
  readSysUserAccountByPidAndName,

  readSysUserAccountPagination,
  readSysUserAccountQueryPagination,
  readSysUserAccountQueryPaginationWithOrder,
};

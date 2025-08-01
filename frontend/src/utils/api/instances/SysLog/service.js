import apolloInstance from '../../apollo/apolloInstance';

import SysLogQuery from '../../graphql/SysLog/SysLogQuery';
import SysLogResponse from '../../../dataModels/SysLog/SysLogResponse';
import PaginationResponse from '../../../dataModels/PaginationResponse';

const readSysLog = () =>
  apolloInstance
    .query({
      query: SysLogQuery.getSysLog,
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return data.sysLogs.items.map((item) => new SysLogResponse(item));
    });

const readSysLogById = (id) =>
  apolloInstance
    .query({
      query: SysLogQuery.getSysLogById(id),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      return new SysLogResponse(data.sysLogs.items[0]);
    });

const readSysLogPagination = ({ take, skip }) =>
  apolloInstance
    .query({
      query: SysLogQuery.getSysLogPagination({
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.sysLogs.items.map((item) => new SysLogResponse(item));
      return new PaginationResponse({
        ...data.sysLogs,
        items,
      });
    });

const readSysLogQueryPagination = ({ query, take, skip }) =>
  apolloInstance
    .query({
      query: SysLogQuery.getSysLogQueryPagination({
        query,
        take,
        skip,
      }),
      fetchPolicy: 'no-cache',
    })
    .then((response) => {
      const { data } = response;
      const items = data.sysLogs.items.map((item) => new SysLogResponse(item));
      return new PaginationResponse({
        ...data.sysLogs,
        items,
      });
    });

export default {
  readSysLog,
  readSysLogById,

  readSysLogPagination,
  readSysLogQueryPagination,
};

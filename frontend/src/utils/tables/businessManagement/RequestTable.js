import BaseTable from '../BaseTable';

import ApiService from '../../api/ApiService';
import QueryHelper from '../../helper/QueryHelper';
import { getAgencyType, getUserId, getUserWorkObject } from '../../auth/auth';
import { dateObjectToDateTimeStringWithTimezone } from '../../parsers/dateParser';

class RequestTable extends BaseTable {
  getTableTitle = () => '';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '題目類型',
      accessor: 'type',
    },
    {
      Header: '題目內容',
      accessor: 'question',
    },
  ];
}

export default RequestTable;

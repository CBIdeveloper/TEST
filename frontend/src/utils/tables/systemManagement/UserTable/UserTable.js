import BaseTable from '../../BaseTable';

import UserActionCell from '../../../../lib/components/tableCells/UserActionCell/UserActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class UserTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
    this.systemCodeId = null;
    this.userObject = {};
  }

  getTableTitle = () => '代碼組資訊列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '信箱',
      accessor: 'email',
    },
    {
      Header: '姓名',
      accessor: 'name',
    },
    {
      Header: '編管單位',
      accessor: 'workPlace',
    },
    {
      Header: '啟用狀態',
      accessor: 'stateString',
    },
    {
      Header: '審核狀態',
      accessor: 'userAccountAppliedStatusString',
    },
    {
      Header: '異動日期',
      accessor: 'createdAtString',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: UserActionCell,
      getProps: () => ({ fetchDataFunction: this.fetchTableData }),
    },
  ];

  getTableSearchObject = () => [
    {
      text: '序',
      value: 'id',
      type: 'number',
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.simpleSysUserAccount
      .readSysUserAccountQueryPagination({
        query: this.query,
        take: this.pageSize,
        skip,
      })
      .then((response) => {
        this.handleTablePagination(response);
        this.setTableDataState(response.items);
        this.setTableCount(response.totalCount);
      });
  };

  queryPrefix = () =>
    QueryHelper.equal('userAccountAppliedStatus', 1, 'number');
}

export default UserTable;

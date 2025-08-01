import BaseTable from '../../BaseTable';

import AccessControlActionCell from '../../../../lib/components/tableCells/AccessControlActionCell/AccessControlActionCell';

import ApiService from '../../../api/ApiService';

class AccessControlTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '角色權限列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '角色名稱',
      accessor: 'roleName',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: AccessControlActionCell,
      getProps: () => ({ fetchDataFunction: this.fetchTableData }),

    },
  ];

  getTableSearchObject = () => [
    {
      text: '序',
      value: 'id',
      type: 'number',
    },
    {
      text: '角色名稱',
      value: 'roleName',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    this.query = '';
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.roleMain
      .readRoleMainQueryPagination({
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
}

export default AccessControlTable;

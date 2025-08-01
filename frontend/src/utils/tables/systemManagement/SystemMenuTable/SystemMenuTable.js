import BaseTable from '../../BaseTable';

import SystemMenuActionCell from '../../../../lib/components/tableCells/SystemMenuActionCell/SystemMenuActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class SystemMenuTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '系統選單列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '選單名稱',
      accessor: 'menuName',
    },
    {
      Header: '程式路徑',
      accessor: 'url',
    },
    {
      Header: '選單排序',
      accessor: 'sequenceNumber',
    },
    {
      Header: '代碼管理',
      accessor: 'action',
      Cell: SystemMenuActionCell,
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
      text: '選單名稱',
      value: 'menuName',
      type: 'text',
    },
    {
      text: '程式路徑',
      value: 'url',
      type: 'text',
    },
    {
      text: '選單排序',
      value: 'sequenceNumber',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.menu
      .readMenuQueryPagination({
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

  queryPrefix = () => QueryHelper.equal('menuType', '0', 'string');
}

export default SystemMenuTable;

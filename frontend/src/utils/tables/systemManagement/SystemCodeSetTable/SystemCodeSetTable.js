import BaseTable from '../../BaseTable';

import SystemCodeSetActionCell from '../../../../lib/components/tableCells/SystemCodeSetActionCell/SystemCodeSetActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class SystemCodeSetTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
    this.systemCodeId = null;
  }
  getTableTitle = () => '代碼組資訊列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '代碼項中文名稱',
      accessor: 'name',
    },
    {
      Header: '代碼排序',
      accessor: 'sequenceNumber',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: SystemCodeSetActionCell,
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
    console.log(this.systemCodeId)
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.codefile
      .readCodefileQueryPagination({
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
    // console.log(this.systemCodeId)
    QueryHelper.equal('parentCodeId', this.systemCodeId, 'string');
}

export default SystemCodeSetTable;

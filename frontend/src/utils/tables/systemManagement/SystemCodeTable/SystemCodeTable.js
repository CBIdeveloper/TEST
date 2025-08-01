import BaseTable from '../../BaseTable';

import ApiService from '../../../api/ApiService';

import SystemCodeActionCell from '../../../../lib/components/tableCells/SystemCodeActionCell/SystemCodeActionCell';
import QueryHelper from '../../../helper/QueryHelper';

class SystemCodeTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '系統代碼列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '代碼中文名稱',
      accessor: 'name',
    },
    {
      Header: '代碼英文名稱',
      accessor: 'heading',
    },
    {
      Header: '代碼管理',
      accessor: 'action',
      Cell: SystemCodeActionCell,
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
      text: '代碼中文名稱',
      value: 'name',
      type: 'text',
    },
    {
      text: '代碼英文名稱',
      value: 'heading',
      type: 'text',
    },
  ];

  fetchTableData = () => {
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
  

  queryPrefix = () => QueryHelper.equal('parentCodeId', '0', 'string');
}

export default SystemCodeTable;

import BaseTable from '../../BaseTable';

import MobilizationPlanActionCell from '../../../../lib/components/tableCells/MobilizationPlanActionCell/MobilizationPlanActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class MobilizationPlanManagementTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
    this.idList = [];
  }

  getTableTitle = () => '動員方案管理列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '動員方案別',
      accessor: 'planName',
    },
    {
      Header: ' 功能',
      accessor: 'action',
      Cell: MobilizationPlanActionCell,
    },
  ];

  getTableSearchObject = () => [
    {
      text: '動員方案別',
      value: 'mobilizationPlanId',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.mobilizationPlan
      .readMobilizationPlanQueryPagination({
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
    QueryHelper.include('id', JSON.stringify(this.idList), 'number');
}

export default MobilizationPlanManagementTable;

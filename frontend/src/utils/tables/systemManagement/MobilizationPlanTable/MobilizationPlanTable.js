import BaseTable from '../../BaseTable';

import MobilizationPlanManagementActionCell from '../../../../lib/components/tableCells/MobilizationPlanManagementActionCell/MobilizationPlanManagementActionCell';

import ApiService from '../../../api/ApiService';

class MobilizationPlanTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '業務計畫列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '動員方案名稱',
      accessor: 'planName',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: MobilizationPlanManagementActionCell,
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
      text: '動員方案名稱',
      value: 'planName',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    this.query = '';
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
}

export default MobilizationPlanTable;

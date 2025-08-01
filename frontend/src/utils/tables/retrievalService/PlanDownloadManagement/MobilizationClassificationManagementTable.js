import BaseTable from '../../BaseTable';

import MobilizationClassificationActionCell from '../../../../lib/components/tableCells/MobilizationClassificationActionCell/MobilizationClassificationActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class MobilizationClassificationManagementTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
    this.idList = [];
  }

  getTableTitle = () => '動員分類管理列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '動員分類',
      accessor: 'classificationName',
    },
    {
      Header: '動員方案別',
      accessor: 'mobilizationPlan',
    },
    {
      Header: ' 功能',
      accessor: 'action',
      Cell: MobilizationClassificationActionCell,
    },
  ];

  getTableSearchObject = () => [
    {
      text: '動員分類',
      value: 'id',
      type: 'text',
    },
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
    ApiService.mobilizationClassification
      .readMobilizationClassificationQueryPagination({
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

export default MobilizationClassificationManagementTable;

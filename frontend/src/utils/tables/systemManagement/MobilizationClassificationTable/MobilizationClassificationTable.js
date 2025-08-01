import BaseTable from '../../BaseTable';

import MobilizationClassificationManagementActionCell from '../../../../lib/components/tableCells/MobilizationClassificationManagementActionCell/MobilizationClassificationManagementActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class MobilizationClassificationTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
    this.mobilizationPlanId = null;
  }

  getTableTitle = () => '業務計畫列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '動員分類名稱',
      accessor: 'classificationName',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: MobilizationClassificationManagementActionCell,
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
      value: 'classificationName',
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
    QueryHelper.equal('mobilizationPlanId', this.mobilizationPlanId, 'number');
}

export default MobilizationClassificationTable;

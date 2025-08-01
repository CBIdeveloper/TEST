import BaseTable from '../../BaseTable';

import DownloadCell from '../../../../lib/components/tableCells/DownloadCell/DownloadCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class MobilizationPlanTable extends BaseTable {
  constructor(props) {
    super(props);
    this.typeId = null;
  }

  getTableTitle = () => '動員綱領列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '動員準備方案',
      accessor: 'mobilizationPlanSubject',
    },
    {
      Header: '策訂單位',
      accessor: 'releaseFirstlevelAgency',
    },
    {
      Header: '策訂日期',
      accessor: 'releaseDateString',
    },
    {
      Header: '檔案',
      accessor: 'uploadedFileName',
      Cell: DownloadCell,
      getProps: () => ({
        downloadFunction: this.downloadFile,
      }),
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.planMobilizationPlan
      .readPlanMobilizationPlanQueryPagination({
        query: this.query,
        take: this.pageSize,
        skip,
      })
      .then((response) => {
        this.handleTablePagination(response);
        this.setTableDataState(response.items);
      });
  };

  queryPrefix = () =>
    QueryHelper.equal('mobilizationPlanId', this.typeId, 'number');

  downloadFile = (cell) =>
    ApiService.planMobilizationPlan.downloadMobilizationPlan(
      cell.row.original.id,
    );
}

export default MobilizationPlanTable;

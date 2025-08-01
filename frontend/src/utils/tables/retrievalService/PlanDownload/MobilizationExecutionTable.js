import BaseTable from '../../BaseTable';

import DownloadCell from '../../../../lib/components/tableCells/DownloadCell/DownloadCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class MobilizationExecutionTable extends BaseTable {
  constructor(props) {
    super(props);
    this.typeId = null;
  }

  getTableTitle = () => '動員執行管理列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '公告主旨',
      accessor: 'mobilizationExecutionSubject',
      Cell: DownloadCell,
      getProps: () => ({
        downloadFunction: this.downloadFile,
      }),
    },
    {
      Header: '策訂單位',
      accessor: 'releaseFirstlevelUnit',
    },
    {
      Header: '策訂日期',
      accessor: 'releaseDateString',
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.planMobilizationExecution
      .readPlanMobilizationExecutionQueryPagination({
        query: this.query,
        take: this.pageSize,
        skip,
      })
      .then((response) => {
        this.handleTablePagination(response);
        this.setTableDataState(response.items);
      });
  };

  queryPrefix = () => QueryHelper.equal('cityId', this.typeId, 'number');

  downloadFile = (cell) =>
    ApiService.planMobilizationExecution.downloadMobilizationExecution(
      cell.row.original.id,
    );
}

export default MobilizationExecutionTable;

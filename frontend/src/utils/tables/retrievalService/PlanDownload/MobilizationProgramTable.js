import BaseTable from '../../BaseTable';

import DownloadCell from '../../../../lib/components/tableCells/DownloadCell/DownloadCell';

import ApiService from '../../../api/ApiService';

class MobilizationProgramTable extends BaseTable {
  getTableTitle = () => '動員綱領列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '動員綱領',
      accessor: 'mobilizationProgramSubject',
      Cell: DownloadCell,
      getProps: () => ({
        downloadFunction: this.downloadFile,
      }),
    },
    {
      Header: '策訂單位',
      accessor: 'releaseFirstlevelAgency',
    },
    {
      Header: '策訂日期',
      accessor: 'releaseDateString',
    },
  ];

  fetchTableData = () => {
    this.query = '';
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.planMobilizationProgram
      .readPlanMobilizationProgramQueryPagination({
        query: this.query,
        take: this.pageSize,
        skip,
      })
      .then((response) => {
        this.handleTablePagination(response);
        this.setTableDataState(response.items);
      });
  };

  downloadFile = (cell) =>
    ApiService.planMobilizationProgram.downloadMobilizationProgram(
      cell.row.original.id,
    );
}

export default MobilizationProgramTable;

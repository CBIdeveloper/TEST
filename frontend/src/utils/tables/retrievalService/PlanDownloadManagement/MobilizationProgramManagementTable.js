import BaseTable from '../../BaseTable';

import DownloadCell from '../../../../lib/components/tableCells/DownloadCell/DownloadCell';
import MobilizationProgramActionCell from '../../../../lib/components/tableCells/MobilizationProgramActionCell/MobilizationProgramActionCell';

import ApiService from '../../../api/ApiService';
import { userHasRole } from '../../../auth/auth';

class MobilizationProgramManagementTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '動員綱領管理列表';

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
        isLink: userHasRole(66),
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
    {
      Header: ' 功能',
      accessor: 'action',
      Cell: MobilizationProgramActionCell,
      getProps: () => ({ fetchDataFunction: this.fetchTableData }),
    },
  ];

  getTableSearchObject = () => [
    {
      text: '動員綱領',
      value: 'mobilizationProgramSubject',
      type: 'text',
    },
    {
      text: '策訂日期',
      value: 'releaseDate',
      type: 'dateRange',
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
        this.setTableCount(response.totalCount);
      });
  };

  downloadFile = (cell) =>
    ApiService.planMobilizationProgram.downloadMobilizationProgram(
      cell.row.original.id,
    );
}

export default MobilizationProgramManagementTable;

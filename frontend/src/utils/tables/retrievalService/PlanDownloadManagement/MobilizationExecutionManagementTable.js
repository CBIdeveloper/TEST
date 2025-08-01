import BaseTable from '../../BaseTable';

import MobilizationExecutionActionCell from '../../../../lib/components/tableCells/MobilizationExecutionActionCell/MobilizationExecutionActionCell';

import ApiService from '../../../api/ApiService';
import DownloadCell from '../../../../lib/components/tableCells/DownloadCell/DownloadCell';
import { userHasRole, getCityId } from '../../../auth/auth';
import QueryHelper from '../../../../utils/helper/QueryHelper';

class MobilizationExecutionManagementTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
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
        isLink: userHasRole(56),
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
    {
      Header: ' 功能',
      accessor: 'action',
      Cell: MobilizationExecutionActionCell,
      getProps: () => ({ fetchDataFunction: this.fetchTableData }),
    },
  ];

  getTableSearchObject = () => [
    {
      text: '公告主旨',
      value: 'mobilizationExecutionSubject',
      type: 'text',
    },
    {
      text: '策訂日期',
      value: 'releaseDate',
      type: 'dateRange',
    },
  ];

  fetchTableData = () => {
    const queryList = [];
    if(getCityId() !== '' && getCityId() !== null){
      queryList.push(
        QueryHelper.equal(
          'cityId',
          getCityId(),
        ),
      );
    }
    if (queryList.length > 0) {
      this.query = QueryHelper.multipleAndQuery(queryList);
    } else {
      this.query = '';
    }
    // this.query = '';  
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
        this.setTableCount(response.totalCount);
      });
  };

  downloadFile = (cell) =>
    ApiService.planMobilizationExecution.downloadMobilizationExecution(
      cell.row.original.id,
    );
}

export default MobilizationExecutionManagementTable;

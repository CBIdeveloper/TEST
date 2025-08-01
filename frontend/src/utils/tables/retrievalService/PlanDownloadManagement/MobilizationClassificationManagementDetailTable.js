import BaseTable from '../../BaseTable';

import DownloadCell from '../../../../lib/components/tableCells/DownloadCell/DownloadCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';
import MobilizationClassificationManageActionCell from '../../../../lib/components/tableCells/MobilizationClassificationManageActionCell/MobilizationClassificationManageActionCell';
import { userHasRole } from '../../../auth/auth';

class MobilizationClassificationManagementDetailTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.classificationId = null;
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '動員分類詳細管理列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '動員準備分類',
      accessor: 'mobilizationClassificationSubject',
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
        isLink: userHasRole(51),
      }),
    },
    {
      Header: ' 管理',
      accessor: 'action',
      Cell: MobilizationClassificationManageActionCell,
      getProps: () => ({ fetchDataFunction: this.fetchTableData }),
    },
  ];

  getTableSearchObject = () => [
    {
      text: '動員準備分類',
      value: 'mobilizationClassificationSubject',
      type: 'text',
    },
    {
      text: '策訂單位',
      value: 'releaseFirstlevelAgencyId',
      type: 'text',
    },
    {
      text: '策訂日期',
      value: 'releaseDate',
      type: 'dateRange',
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.planMobilizationClassification
      .readPlanMobilizationClassificationQueryPagination({
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
    QueryHelper.equal(
      'mobilizationClassificationId',
      this.classificationId,
      'number',
    );

  downloadFile = (cell) =>
    ApiService.planMobilizationClassification.downloadMobilizationClassification(
      cell.row.original.id,
    );
}

export default MobilizationClassificationManagementDetailTable;

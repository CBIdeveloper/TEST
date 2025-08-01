import BaseTable from '../../BaseTable';

import DownloadCell from '../../../../lib/components/tableCells/DownloadCell/DownloadCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class MobilizationClassificationTable extends BaseTable {
  constructor(props) {
    super(props);
    this.typeId = null;
  }

  getTableTitle = () => '動員分類列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '動員分類計畫',
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
      }),
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
      });
  };

  queryPrefix = () =>
    QueryHelper.equal('mobilizationClassificationId', this.typeId, 'number');

  downloadFile = (cell) =>
    ApiService.planMobilizationClassification.downloadMobilizationClassification(
      cell.row.original.id,
    );
}

export default MobilizationClassificationTable;

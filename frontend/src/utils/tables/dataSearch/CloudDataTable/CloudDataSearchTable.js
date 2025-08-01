import BaseTable from '../../BaseTable';
import CloudDataSearchActionCell from '../../../../lib/components/tableCells/CloudDataSearchActionCell/CloudDataActionCell';
import CloudDataSearchActionCell2 from '../../../../lib/components/tableCells/CloudDataSearchActionCell2/CloudDataActionCell';
import './CloudDataTable.scss';
import CloudDataSearchEditorActionCell from '../../../../lib/components/tableCells/CloudDataSearchEditorActionCell/CloudDataSearchEditorActionCell';
import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';
import { getCityId, getAgencyType } from '../../../auth/auth';
class CloudDataTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '雲端資料列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '編管類別',
      accessor: 'fullName',
    },
    {
      Header: '中央主管機關',
      accessor: 'mobilizationAgency',
    },
    {
      Header: '編輯機關',
      accessor: 'editAgency',
    },
    {
      Header: '編輯人員',
      accessor: 'action',
      Cell: CloudDataSearchEditorActionCell,
    },
    {
      Header: '資料傳輸',
      accessor: 'transAt',
      className: 'aqua',
    },
    {
      Header: '傳輸筆數',
      accessor: 'transCount',
      className: 'aqua',
    },
    {
      Header: '合規筆數',
      accessor: 'complianceQuantity',
      className: 'cloud-data-table-orange',
    },
    {
      Header: '不合規筆數',
      accessor: 'nonComplianceQuantity',
      className: 'cloud-data-table-orange',
    },
    {
      Header: '不合規原因',
      accessor: 'action2',
      Cell: CloudDataSearchActionCell2,
      className: 'cloud-data-table-orange',
    },
    {
      Header: '資料規格',
      accessor: 'action3',
      Cell: CloudDataSearchActionCell,
    },
  ];

  fetchTableData = () => {
    if (getCityId()) {
      this.query = QueryHelper.singleQuery(this.queryPrefix());
    }
    this.queryTableData();
  };

  queryTableData = (count) => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    if (getCityId()) {
      ApiService.fileUpload
        .readCloudDataSearch({
          query: this.query,
          take: this.pageSize,
          skip,
        })
        .then((response) => {
          this.handleTablePagination(response);
          this.setTableDataState(response.items);
          this.setTableCount(response.totalCount);
        });
    } else if (count == 1) {
      ApiService.fileUpload
        .readCloudDataSearch({
          query: this.query,
          take: this.pageSize,
          skip,
        })
        .then((response) => {
          this.handleTablePagination(response);
          this.setTableDataState(response.items);
          this.setTableCount(response.totalCount);
        });
    } else {
      ApiService.fileUpload
        .readCloudDataSearch({
          query: '',
          take: this.pageSize,
          skip,
        })
        .then((response) => {
          this.handleTablePagination(response);
          this.setTableDataState(response.items);
          this.setTableCount(response.totalCount);
        });
    }
  };

  queryPrefix = () => {
    const allQuery = QueryHelper.equal('cityId', getCityId(), 'number');
    return QueryHelper.andQuery([allQuery]);
  };
}

export default CloudDataTable;

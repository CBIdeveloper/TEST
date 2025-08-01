import BaseTable from '../../BaseTable';

import RegulationNameCell from '../../../../lib/components/tableCells/RegulationNameCell/RegulationNameCell';
import RegulationActionCell from '../../../../lib/components/tableCells/RegulationActionCell/RegulationActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class RegulationManagementTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.typeId = 0;
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '法規查詢管理列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '法規名稱',
      accessor: 'regulationName',
      Cell: RegulationNameCell,
    },
    {
      Header: ' 功能',
      accessor: 'action',
      Cell: RegulationActionCell,
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
      text: '法規名稱',
      value: 'regulationName',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.regulation
      .readRegulationQueryPagination({
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
    QueryHelper.equal('regulationType', this.typeId, 'number');
}

export default RegulationManagementTable;

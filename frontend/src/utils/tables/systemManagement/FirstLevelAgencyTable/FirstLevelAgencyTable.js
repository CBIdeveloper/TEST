import BaseTable from '../../BaseTable';

import ApiService from '../../../api/ApiService';

import FirstLevelAgencyActionCell from '../../../../lib/components/tableCells/FirstLevelAgencyActionCell/FirstLevelAgencyActionCell';

class FirstLevelAgencyTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '中央機關列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '二級機關全銜',
      accessor: 'fullName',
    },
    {
      Header: '二級機關簡稱',
      accessor: 'shortName',
    },
    {
      Header: '英文代碼',
      accessor: 'enCode',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: FirstLevelAgencyActionCell,
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
      text: '二級機關全銜',
      value: 'fullName',
      type: 'text',
    },
    {
      text: '二級機關簡稱',
      value: 'shortName',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    this.query = '';
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.firstlevelAgency
      .readFirstlevelAgencyQueryPagination({
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
}

export default FirstLevelAgencyTable;

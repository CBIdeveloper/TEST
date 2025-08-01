import BaseTable from '../../BaseTable';

import SecondaryAgencyActionCell from '../../../../lib/components/tableCells/SecondaryAgencyActionCell/SecondaryAgencyActionCell';

import ApiService from '../../../api/ApiService';

class SecondaryAgencyTable extends BaseTable {
  constructor(setTableDataState) {
    super(setTableDataState);
    this.firstLevelId = null;
  }

  getTableTitle = () => '中央機關列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '三級機關全銜',
      accessor: 'fullName',
    },
    {
      Header: '三級機關簡稱',
      accessor: 'shortName',
    },
    {
      Header: '英文代碼',
      accessor: 'enCode',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: SecondaryAgencyActionCell,
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
      text: '三級機關全銜',
      value: 'fullName',
      type: 'text',
    },
    {
      text: '三級機關簡稱',
      value: 'shortName',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    ApiService.secondaryAgency
      .readSecondaryAgencyByFirstLevelId(this.firstLevelId)
      .then((response) => {
        this.setTableDataState(response);
      });
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.secondaryAgency
      .readSecondaryAgencyQueryPagination({
        query: this.query,
        take: this.pageSize,
        skip,
      })
      .then((response) => {
        this.handleTablePagination(response);
        this.setTableDataState(response.items);
      });
  };
}

export default SecondaryAgencyTable;

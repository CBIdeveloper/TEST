import BaseTable from '../../BaseTable';

import ModificationSearchDescriptionCell
  from '../../../../lib/components/tableCells/ModificationSearchDescriptionCell/ModificationSearchDescriptionCell';

import ApiService from '../../../api/ApiService';

class ModificationSearchTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '資料異動列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '帳號',
      accessor: 'assoiciatedUserAccount',
    },
    {
      Header: '編管單位',
      accessor: 'unitName',
    },
    {
      Header: '異動類型',
      accessor: 'typeString',
    },
    {
      Header: '異動紀錄',
      accessor: 'description',
      Cell: ModificationSearchDescriptionCell
    },
    {
      Header: '異動狀態',
      accessor: 'stateString',
    },
    {
      Header: '異動日期時間',
      accessor: 'loggedAtString',
    },
  ];

  getTableSearchObject = () => [
    {
      text: '序',
      value: 'id',
      type: 'number',
    },
    {
      text: '功能',
      value: 'featureName',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    this.query = '';
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.sysLog
      .readSysLogQueryPagination({
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

export default ModificationSearchTable;

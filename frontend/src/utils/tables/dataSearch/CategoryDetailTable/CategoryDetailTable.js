import BaseTable from '../../BaseTable';

import CategoryDetailActionCell from '../../../../lib/components/tableCells/CategoryDetailActionCell/CategoryDetailActionCell';

class CategoryDetailTable extends BaseTable {
  constructor(setTableData, setTableCount, id) {
    super(setTableData);
    this.setTableCount = setTableCount;
    this.categoryTableHeader = [];
    this.queryFunction = () => {};
    this.configId = id;
  }

  getTableTitle = () => '資料查詢列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    ...this.categoryTableHeader,
    {
      Header: '異動時間',
      accessor: 'creDateString',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: CategoryDetailActionCell,
      getProps: () => ({
        configId: this.configId,
      }),
    },
  ];

  fetchTableData = () => {
    this.query = '';
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    this.queryFunction({
      query: this.query,
      take: this.pageSize,
      skip,
    }).then((response) => {
      this.handleTablePagination(response);
      this.setTableDataState(response.items);
      this.setTableCount(response.totalCount);
    });
  };
}

export default CategoryDetailTable;

import BaseTable from '../../BaseTable';

class ApprovalTable extends BaseTable {
  getTableTitle = () => '批次確認列表';

  getTableHeader = () => [
    {
      Header: '人物別',
      accessor: 'type',
    },
    {
      Header: '編管類別',
      accessor: 'braidingCategory',
    },
    {
      Header: '動員機關',
      accessor: 'mobilizationAgency',
    },
    {
      Header: '前月編管筆數',
      accessor: 'pastBraidingCount',
    },
    {
      Header: '本月編管筆數',
      accessor: 'currentBraidingCount',
    },
    {
      Header: '前月動員筆數',
      accessor: 'pastMobilizationCount',
    },
    {
      Header: '本月動員筆數',
      accessor: 'currentMobilizationCount',
    },
  ];
}

export default ApprovalTable;

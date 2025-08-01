import BaseTable from '../../BaseTable';

import SelectAllButtonCell from '../../../../lib/components/tableCells/SelectAllButtonCell/SelectAllButtonCell';
import SelectButtonCell from '../../../../lib/components/tableCells/SelectButtonCell/SelectButtonCell';

class AcceptInformationRetrievalTable extends BaseTable {
  getTableTitle = () => '批次確認列表';

  getTableHeader = () => [
    {
      Header: '人物別',
      accessor: 'type',
    },
    {
      Header: '編管類別',
      accessor: 'name',
    },
    {
      Header: '動員機關',
      accessor: 'agencyName',
    },
    {
      Header: '前期編管筆數',
      accessor: 'hrLastPeriod',
    },
    {
      Header: '本期編管筆數',
      accessor: 'hrCurrentPeriod',
    },
    {
      Header: '前期動員筆數',
      accessor: 'frLastPeriod',
    },
    {
      Header: '本期動員筆數',
      accessor: 'frCurrentPeriod',
    },
    {
      Header: SelectAllButtonCell,
      accessor: 'selectButton',
      Cell: SelectButtonCell,
      disableSortBy: true,
    },
  ];
}

export default AcceptInformationRetrievalTable;

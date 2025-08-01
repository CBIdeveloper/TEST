import BaseTable from '../../BaseTable';

import RemarkCell from '../../../../lib/components/tableCells/RemarkCell/RemarkCell';

class CriteriaTable extends BaseTable {
  getTableTitle = () => '資料標準列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'id',
    },
    {
      Header: '中文欄位',
      accessor: 'chineseField',
    },
    {
      Header: '英文欄位',
      accessor: 'englishField',
    },
    {
      Header: '資料類別',
      accessor: 'dataType',
    },
    {
      Header: '型別',
      accessor: 'type',
    },
    {
      Header: '長度',
      accessor: 'length',
    },
    {
      Header: '備註',
      accessor: 'remark',
      Cell: RemarkCell,
    },
  ];
}

export default CriteriaTable;

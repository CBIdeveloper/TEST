import BaseTable from '../../BaseTable';

import DataSearchActionCell from '../../../../lib/components/tableCells/DataSearchActionCell/DataSearchActionCell';
import Header from '../../../../components/Header/Header';

class DataSearchTable extends BaseTable {
  getTableTitle = () => '資料查詢列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'sort2',
    },
    {
      Header: '區分',
      accessor: 'type',
    },
    {
      Header: '編管類別',
      accessor: 'name2',
    },
    {
      Header: '動員方案',
      accessor: 'mobilizationPlan',
    },
    {
      Header: '動員分類',
      accessor: 'mobilizationClassification',
    },
    {
      Header: '中央主管機關',
      accessor: 'mobilizationAgency',
    },
    {
      Header: '更新週期(月)',
      accessor: 'updateCycle',
    },
    {
      Header: '計畫編管數',
      accessor: 'braidingNum',
    },
    {
      Header: '系統數據',
      accessor: 'systemNum',
    },
    // {
    //   Header: '確認單位',
    //   accessor: 'approvalUnit',
    // },
    {
      Header: '確認狀態',
      accessor: 'approvalStatus',
    },
    {
      Header: '資料異動日期',
      accessor: 'updatedAtString',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: DataSearchActionCell,
    },
  ];
}

export default DataSearchTable;

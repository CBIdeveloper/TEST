import BaseTable from '../../BaseTable';
import CloudDataActionCell from '../../../../lib/components/tableCells/CloudDataActionCell/CloudDataActionCell';
import CloudDataEditActionCell from '../../../../lib/components/tableCells/CloudDataEditActionCell/CloudDataEditActionCell';
import CloudDataTransDataActionCell from '../../../../lib/components/tableCells/CloudDataTransDataActionCell/CloudDataTransDataActionCell';
import CloudDataStateActionCell from '../../../../lib/components/tableCells/CloudDataStateActionCell/CloudDataStateActionCell';

import './CloudDataTable.scss';
class CloudDataTable extends BaseTable {
  getTableTitle = () => '雲端資料列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'sort2',
    },
    {
      Header: '編管類別',
      accessor: 'name2',
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
      Header: '資料傳輸',
      accessor: 'transAt',
      Cell: CloudDataTransDataActionCell,
      className: 'aqua',
    },
    {
      Header: '傳輸筆數',
      accessor: 'transCount',
      className: 'aqua',
    },
    {
      Header: '資料編輯',
      accessor: 'action2',
      Cell: CloudDataEditActionCell,
      className: 'cloud-data-table-orange',
    },
    {
      Header: '檢核狀態',
      accessor: 'action3',
      Cell: CloudDataStateActionCell,
      className: 'cloud-data-table-orange',
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
      Header: '資料規格',
      accessor: 'action4',
      Cell: CloudDataActionCell,
    },
  ];
}

export default CloudDataTable;

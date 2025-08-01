import BusinessManagementTable from '../BusinessManagementTable';

import BusinessManagementActionCell from '../../../../lib/components/tableCells/BusinessManagementActionCell/BusinessManagementActionCell';
import ModalCell from '../../../../lib/components/tableCells/ModalCell/ModalCell';
import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

class MobilizationCategorizationTable extends BusinessManagementTable {
  getTableTitle = () => '動員分類計畫審議列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '標題',
      accessor: 'title',
      Cell: ModalCell,
      getProps: () => ({ modalTitle: '動員分類計畫審議' }),
    },
    {
      Header: '公告單位',
      accessor: 'announcementUnit',
    },
    {
      Header: '承辦人員',
      accessor: 'announcedUserAccount',
    },
    {
      Header: '聯絡電話',
      accessor: 'telephoneNumber',
    },
    {
      Header: '日期',
      accessor: 'announcementDateString',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: BusinessManagementActionCell,
      getProps: () => ({
        modalTitle: '動員分類計畫審議',
        fetchDataFunction: this.fetchTableData,
        editPagePath: Path.editMobilizationCategorizationPath,
        displayEdit: userHasRole(128),
        displayDelete: userHasRole(129),
      }),
    },
  ];
}

export default MobilizationCategorizationTable;

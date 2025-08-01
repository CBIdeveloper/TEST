import BaseTable from './BaseTable';
import store from '../../store/store';

import ReminderTitleCell from '../../lib/components/tableCells/ReminderTitleCell/ReminderTitleCell';

class ReminderTable extends BaseTable {
  getTableTitle = () => '待辦事項表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '類型',
      accessor: 'typeString',
    },
    {
      Header: '模組',
      accessor: 'moduleString',
    },
    {
      Header: '待辦/通知事項',
      accessor: 'title',
      Cell: ReminderTitleCell,
    },
  ];

  fetchTableData = () => {
    const state = store.getState();
    this.setTableDataState(state.notification.notification.notificationList);
  };
}

export default ReminderTable;

import BaseTable from './BaseTable';

class RegisterProgressTable extends BaseTable {
  getTableTitle = () => '帳號申請進度列表';

  getTableHeader = () => [
    {
      Header: '帳號',
      accessor: 'account',
    },
    {
      Header: '中央機關',
      accessor: 'workPlace',
    },
    {
      Header: '公告人員',
      accessor: 'name',
    },
    {
      Header: '申請日期',
      accessor: 'createdAtString',
    },
    {
      Header: '申請狀態',
      accessor: 'userAccountAppliedStatusString',
    },
    {
      Header: '審核意見',
      accessor: 'reasonOfFailure',
    },
  ];
}

export default RegisterProgressTable;

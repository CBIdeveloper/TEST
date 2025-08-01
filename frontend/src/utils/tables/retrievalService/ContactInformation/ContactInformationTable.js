import BaseTable from '../../BaseTable';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';
import ContactInfomationActionCell from '../../../../lib/components/tableCells/ContactInfomationActionCell/ContactInfomationActionCell';
import './ContactInformationTable.scss';
class ContactInfomationTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
    this.systemCodeId = null;
    this.userObject = {};
  }
  getTableTitle = () => '';
  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '姓名',
      accessor: 'name',
    },
    {
      Header: '職稱',
      accessor: 'jobPosition',
    },
    {
      Header: '單位類型',
      accessor: 'agencyName',
    },
    {
      Header: '單位',
      accessor: 'workPlace',
    },
    {
      Header: '連絡電話',
      accessor: 'fullPhone',
    },
    {
      Header: '業務計畫別',
      accessor: 'mobilizationPlanText',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: ContactInfomationActionCell,
      className: 'center',
    },
  ];

  getTableSearchObject = () => [
    {
      text: '序',
      value: 'id',
      type: 'number',
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.simpleSysUserAccountContact
      .readSysUserAccountContactQueryPagination({
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

  queryPrefix = () =>
    QueryHelper.andQuery([
      QueryHelper.equal('state', 1, 'string'),
      QueryHelper.equal('userAccountAppliedStatus', 1, 'number'),
    ]);
}

export default ContactInfomationTable;

import BaseTable from '../BaseTable';

import ApiService from '../../api/ApiService';
import QueryHelper from '../../helper/QueryHelper';
import { getAgencyType, getUserId, getUserWorkObject } from '../../auth/auth';
import { dateObjectToDateTimeStringWithTimezone } from '../../parsers/dateParser';

class BusinessManagementTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.workObject = getUserWorkObject();
    this.typeId = 0;
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '業務管考列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '標題',
      accessor: 'title',
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
    },
  ];

  getTableSearchObject = () => [
    {
      text: '序',
      value: 'id',
      type: 'number',
    },
    {
      text: '標題',
      value: 'title',
      type: 'text',
    },
    {
      text: '公告單位',
      value: 'announcementUnit',
      type: 'text',
    },
    {
      text: '承辦人員',
      value: 'announcementUser',
      type: 'text',
    },
    {
      text: '聯絡電話',
      value: 'telephoneNumber',
      type: 'text',
    },
    {
      text: '日期',
      value: 'date',
      type: 'dateRange',
    },
  ];

  fetchTableData = () => {
    this.query = QueryHelper.singleQuery(this.queryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.businessManagement
      .readBusinessManagementQueryPagination({
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

  queryPrefix = () => {
    const typeQuery = QueryHelper.equal(
      'businessManagementTestType',
      this.typeId,
      'number',
    );
    // const createdUser = QueryHelper.equal(
    //   'createdUserAccountId',
    //   getUserId(),
    //   'number',
    // );
    // const announcedUser = QueryHelper.equal(
    //   'announcedUserAccountId',
    //   getUserId(),
    //   'number',
    // );
    // const announced = QueryHelper.less(
    //   'announcementDate',
    //   dateObjectToDateTimeStringWithTimezone(new Date()),
    // );

    // let idQuery = null;
    // if (this.workObject.agencyType === '1') {
    //   if (
    //     this.workObject.secondaryAgencyId !== '' &&
    //     this.workObject.secondaryAgencyId !== null
    //   ) {
    //     idQuery = QueryHelper.equal(
    //       ['secondaryAgencies', 'some', 'id'],
    //       this.workObject.secondaryAgencyId,
    //       'number',
    //     );
    //   } else if (
    //     this.workObject.firstLevelAgencyId !== '' &&
    //     this.workObject.firstLevelAgencyId !== null
    //   ) {
    //     idQuery = QueryHelper.equal(
    //       ['firstlevelAgencies', 'some', 'id'],
    //       this.workObject.firstLevelAgencyId,
    //       'number',
    //     );
    //   }
    // } else if (
    //   this.workObject.firstLevelUnitId !== '' &&
    //   this.workObject.firstLevelUnitId !== null
    // ) {
    //   idQuery = QueryHelper.equal(
    //     ['firstlevelUnits', 'some', 'id'],
    //     this.workObject.firstLevelUnitId,
    //     'number',
    //   );
    // }

    return QueryHelper.andQuery([
      typeQuery,
      // groupByQuery,
      // QueryHelper.orQuery([
      //   // createdUser,
      //   announcedUser,
      // ]),
    ]);
  };
}

export default BusinessManagementTable;

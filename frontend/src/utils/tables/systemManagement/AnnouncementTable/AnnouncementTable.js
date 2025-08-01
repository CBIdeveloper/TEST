import BaseTable from '../../BaseTable';

import AnnouncementCell from '../../../../lib/components/tableCells/AnnouncementCell/AnnouncementCell';
import AnnouncementActionCell from '../../../../lib/components/tableCells/AnnouncementActionCell/AnnouncementActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';
import { dateObjectToDateString } from '../../../parsers/dateParser';

class AnnouncementTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '最新消息列表';

  getViewTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '主旨',
      accessor: 'title',
      Cell: AnnouncementCell,
    },
    {
      Header: '日期',
      accessor: 'announcementBeganAtString',
    },
  ];

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '主旨',
      accessor: 'title',
      Cell: AnnouncementCell,
    },
    {
      Header: '公告開始日期',
      accessor: 'announcementBeganAtString',
    },
    {
      Header: '公告截止日期',
      accessor: 'announcementEndedAtString',
    },
    {
      Header: '置頂',
      accessor: 'isPinnedString',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: AnnouncementActionCell,
      getProps: () => ({ fetchDataFunction: this.fetchTableData }),
    },
  ];

  getTableSearchObject = () => [
    {
      text: '序',
      value: 'id',
      type: 'number',
    },
    {
      text: '主旨',
      value: 'title',
      type: 'text',
    },
  ];

  fetchTableData = () => {
    this.query = '';
    this.queryTableData();
  };

  fetchTodayTableData = () => {
    this.query = QueryHelper.singleQuery(this.todayQueryPrefix());
    this.queryTableData();
  };

  queryTableData = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.announcement
      .readAnnouncementQueryPagination({
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

  todayQueryPrefix = () =>
    QueryHelper.orQuery([
      QueryHelper.andQuery([
        QueryHelper.less(
          'announcementBeganAt',
          dateObjectToDateString(new Date()),
          'string',
        ),
        QueryHelper.greater(
          'announcementEndedAt',
          dateObjectToDateString(new Date()),
          'string',
        ),
      ]),
      QueryHelper.andQuery([
        QueryHelper.less(
          'announcementBeganAt',
          dateObjectToDateString(new Date()),
          'string',
        ),
        QueryHelper.equal('announcementEndedAt', null, 'null'),
      ]),
    ]);
}

export default AnnouncementTable;

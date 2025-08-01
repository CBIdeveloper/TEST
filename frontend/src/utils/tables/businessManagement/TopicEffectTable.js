import BaseTable from '../BaseTable';

import TopicEffectActionCell from '../../../lib/components/tableCells/TopicEffectActionCell/TopicEffectActionCell';
import ApiService from '../../api/ApiService';
import QueryHelper from '../../helper/QueryHelper';
import { getUserWorkObject } from '../../auth/auth';

import './TopicEffectTable.scss';

class TopicEffectTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.workObject = getUserWorkObject();
    this.setTableCount = setTableCount;
  }

  getTableTitle = () => '合署成效列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '會議事由(講習名稱)',
      accessor: 'title',
      className: 'col-left',
    },
    {
      Header: '類別區分',
      accessor: 'meetingTypeName',
    },
    {
      Header: '地點',
      accessor: 'meetingPlace',
    },
    {
      Header: '承辦單位',
      accessor: 'announcementUnit',
    },
    {
      Header: '承辦人員',
      accessor: 'announcedUserAccount',
    },
    {
      Header: '會議日期',
      accessor: 'meetingDate',
    },
    {
      Header: '研討議題',
      accessor: 'topicListString',
      className: 'col-left',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: TopicEffectActionCell,
      getProps: () => ({
        modalTitle: '執行成效',
        fetchDataFunction: this.fetchTableData,
      }),
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
    const isSignQuery = QueryHelper.equal(
      'isSign',
      true,
      'bool',
    );

    return QueryHelper.andQuery([
      isSignQuery
    ]);
  };
}

export default TopicEffectTable;

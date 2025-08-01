import BaseTable from '../../BaseTable';

import ApproveUserActionCell from '../../../../lib/components/tableCells/ApproveUserActionCell/ApproveUserActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';

class ApproveUserTable extends BaseTable {
  constructor(setTableDataState, setTableCount) {
    super(setTableDataState);
    this.setTableCount = setTableCount;
    this.systemCodeId = null;
    this.userObject = {};
  }

  getTableTitle = () => '代碼組資訊列表';

  getTableHeader = () => [
    {
      Header: '序',
      accessor: 'index',
    },
    {
      Header: '信箱',
      accessor: 'email',
    },
    {
      Header: '姓名',
      accessor: 'name',
    },
    {
      Header: '編管單位',
      accessor: 'workPlace',
    },
    // TODO: only for development
    // {
    //   Header: '系統角色',
    //   accessor: 'role',
    // },
    {
      Header: '審核狀態',
      accessor: 'userAccountAppliedStatusString',
    },
    {
      Header: '異動日期',
      accessor: 'createdAtString',
    },
    {
      Header: '功能',
      accessor: 'action',
      Cell: ApproveUserActionCell,
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
    ApiService.simpleSysUserAccount
      .readSysUserAccountQueryPagination({
        query: this.query,
        take: this.pageSize,
        skip,
      })
      .then((response) => {
        console.log(response)
        this.handleTablePagination(response);
        this.setTableDataState(response.items);
        this.setTableCount(response.totalCount);
      });
  };

  queryTableDataWithOrder = () => {
    const skip = this.calculateSkip(this.currentPage, this.pageSize);
    ApiService.simpleSysUserAccount
      .readSysUserAccountQueryPaginationWithOrder({
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
    const {
      businessPlan,
      isPlansponsor,
      mobilizationPlanIdList,
      mobilizationClassificationIdList,
    } = this.userObject;
    if (businessPlan === '1') {
      return QueryHelper.orQuery([
        QueryHelper.equal('userAccountAppliedStatus', 0, 'number'),
        QueryHelper.equal('userAccountAppliedStatus', 2, 'number'),
      ]);
    }
    if (businessPlan === '2' && isPlansponsor) {
      return QueryHelper.andQuery([
        QueryHelper.include(
          [
            'braidingCategories',
            'some',
            'mobilizationClassification',
            'mobilizationPlanId',
          ],
          JSON.stringify(mobilizationPlanIdList),
          'number',
        ),
        QueryHelper.orQuery([
          QueryHelper.equal('userAccountAppliedStatus', 0, 'number'),
          QueryHelper.equal('userAccountAppliedStatus', 2, 'number'),
        ]),
      ]);
    }
    if (businessPlan === '3' && isPlansponsor) {
      return QueryHelper.andQuery([
        QueryHelper.include(
          ['braidingCategories', 'some', 'mobilizationClassificationId'],
          JSON.stringify(mobilizationClassificationIdList),
          'number',
        ),
        QueryHelper.orQuery([
          QueryHelper.equal('userAccountAppliedStatus', 0, 'number'),
          QueryHelper.equal('userAccountAppliedStatus', 2, 'number'),
        ]),
      ]);
    }
    return QueryHelper.equal('userAccountAppliedStatus', 99, 'number');
  };
}

export default ApproveUserTable;

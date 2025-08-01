import BaseTable from '../../BaseTable';

import BraidingCategoryManagementActionCell
    from '../../../../lib/components/tableCells/BraidingCategoryManagementActionCell/BraidingCategoryManagementActionCell';

import ApiService from '../../../api/ApiService';
import QueryHelper from '../../../helper/QueryHelper';
import NumberCell from "../../../../lib/components/tableCells/NumberCell/NumberCell";
import MonthCell from "../../../../lib/components/tableCells/BraidingCategoryManagementMonthCell/BraidingCategoryManagementMonthCell";

class BraidingCategoryTable extends BaseTable {
    constructor(setTableDataState, setTableCount) {
        super(setTableDataState);
        this.setTableCount = setTableCount;
        this.mobilizationClassificationId = null;
    }

    getTableTitle = () => '業務計畫列表';

    getTableHeader = () => [
        {
            Header: '序',
            accessor: 'index',
        },
        {
            Header: '編管類別',
            accessor: 'fullName',
        },
        {
            Header: '人/物力',
            accessor: 'categoryTypeString',
        },
        {
            Header: '計畫編管數',
            accessor: 'projectManagementNumber',
            Cell: NumberCell,
        },
        {
            Header: '更新週期（月）',
            accessor: 'updateCycle',
            Cell: MonthCell,
        },
        {
            Header: '功能',
            accessor: 'action',
            Cell: BraidingCategoryManagementActionCell,
            getProps: () => ({fetchDataFunction: this.fetchTableData}),
        },
    ];

    getTableSearchObject = () => [
        {
            text: '序',
            value: 'id',
            type: 'number',
        },
        {
            text: '動員方案名稱',
            value: 'fullName',
            type: 'text',
        },
    ];

    fetchTableData = () => {
        this.query = QueryHelper.singleQuery(this.queryPrefix());
        this.queryTableData();
    };

    queryTableData = () => {
        const skip = this.calculateSkip(this.currentPage, this.pageSize);
        ApiService.braidingCategory
            .readBraidingCategoryQueryPagination({
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
        QueryHelper.equal(
            'mobilizationClassificationId',
            this.mobilizationClassificationId,
            'number',
        );
}

export default BraidingCategoryTable;

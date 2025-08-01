import BaseTable from '../../BaseTable';

import PermissionApplicationCell
    from '../../../../lib/components/tableCells/PermissionApplicationActionCell/PermissionApplicationActionCell';

import ApiService from '../../../api/ApiService';

class PermissionApplicationTable extends BaseTable {
    constructor(setTableDataState, setTableCount) {
        super(setTableDataState);
        this.setTableCount = setTableCount;
    }

    getTableTitle = () => '代碼組資訊列表';

    getTableHeader = () => [
        {
            Header: '序',
            accessor: 'index',
        },
        {
            Header: '申請者',
            accessor: 'name',
        },
        {
            Header: '編管單位',
            accessor: 'unitName',
        },
        {
            Header: '申請日期',
            accessor: 'createdAt',
        },
        {
            Header: '使用日期',
            accessor: 'useDate'
        },
        {
            Header: '申請結果',
            accessor: 'statusString',
        },
        {
            Header: '功能',
            accessor: 'action',
            Cell: PermissionApplicationCell,
            getProps: () => ({fetchDataFunction: this.fetchTableData}),
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
        const skip = this.calculateSkip(this.currentPage, this.pageSize);
        ApiService.permissionApplication
            .readPermissionApplicationPagination({
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

    queryTableData = () => {
        const skip = this.calculateSkip(this.currentPage, this.pageSize);
        ApiService.permissionApplication
            .readPermissionApplicationQueryPagination({
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
}

export default PermissionApplicationTable;

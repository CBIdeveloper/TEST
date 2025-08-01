import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../../../lib/components/Container/Container';
import DateInput from '../../../lib/components/inputs/DateInput/DateInput';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Pagination from '../../../lib/components/Pagination/Pagination';

import {setLoading} from '../../../store/loading/slice';

import PermissionApproveTable
    from '../../../utils/tables/systemManagement/PermissionApproveTable/PermissionApproveTable';
import DateHelper from '../../../utils/helper/DateHelper';
import QueryHelper from '../../../utils/helper/QueryHelper';
import {dateObjectToDateTimeStringWithTimezone} from '../../../utils/parsers/dateParser';

import './PermissionApprove.scss';
import TextInput from "../../../lib/components/inputs/TextInput/TextInput";
import SelectInput from "../../../lib/components/inputs/SelectInput/SelectInput";
import PermissionApproveStatusType from "../../../utils/constants/PermissionApplicationStatusType";

class PermissionApprove extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            tableCount: 0,
            name: '',
            unitName: '',
            useDate: '',
            status: ''
        };
        this.table = new PermissionApproveTable(this.setTableData, this.setTableCount);
    }

    async componentDidMount() {
        const {props} = this;
        props.setLoading(true);
        this.table.fetchTableData();
    }

    setTableData = (tableData) => {
        const {props} = this;
        const data = tableData.map((item, index) => ({
            ...item,
            index: index + this.table.currentSkip() + 1,
        }));
        this.setState({tableData: data});
        props.setLoading(false);
    };

    setTableCount = (tableCount) => {
        this.setState({tableCount});
    };

    setName = (name) => {
        this.setState({name});
    };

    setUnitName = (unitName) => {
        this.setState({unitName});
    };

    setUseDate = (useDate) => {
        this.setState({useDate});
    };

    setStatus = (status) => {
        this.setState({status});
    };

    displaySearchInput = () => {
        const {state} = this;
        return (
            <>
                <div className="date-containers">
                    <div className="text-containers">
                        <TextInput
                            title=""
                            inputName=""
                            inputPlaceholder="姓名關鍵字"
                            inputValue={state.name}
                            inputOnChange={(event) => this.setName(event.target.value)}
                            zenMode
                        />
                        <TextInput
                            title=""
                            inputName=""
                            inputPlaceholder="編管單位關鍵字"
                            inputValue={state.unitName}
                            inputOnChange={(event) => this.setUnitName(event.target.value)}
                            zenMode
                        />
                    </div>
                    <div className="use-date-container">
                        <div className="status-title">使用日期：</div>
                        <DateInput
                            title=""
                            inputName=""
                            inputPlaceholder="使用日期"
                            inputValue={state.useDate}
                            setFieldValue={(field, value) => this.setUseDate(value)}
                            zenMode
                        />
                    </div>
                    <div className="dropdown-container">
                        <SelectInput
                            title=""
                            inputName=""
                            inputPlaceholder="審核狀態"
                            inputValue={state.status}
                            options={PermissionApproveStatusType}
                            setFieldValue={(field, value) => this.setStatus(value)}
                            zenMode
                        />
                    </div>
                </div>
            </>
        );
    };

    search = () => {
        const {props, state} = this;
        const queryList = [];
        props.setLoading(true);
        if (state.name !== '') {
            queryList.push(QueryHelper.contains('name', state.name, 'string'));
        }
        if (state.unitName !== '') {
            queryList.push(QueryHelper.contains('unitName', state.unitName, 'string'));
        }
        if (state.useDate !== '') {
            queryList.push(
                QueryHelper.lt(
                    'useStartDate',
                    dateObjectToDateTimeStringWithTimezone(DateHelper.addDays(state.useDate, 1)),
                ),
            );
            
            queryList.push(
                QueryHelper.greater(
                    'useEndDate',
                    dateObjectToDateTimeStringWithTimezone(DateHelper.addDays(state.useDate))
                ),
            );
        }
        if (state.status !== '') {
            queryList.push(
                QueryHelper.equal(
                    'status',
                    state.status,
                    'number',
                ),
            );
        }

        this.table.currentPage = 1;

        if (queryList.length !== 0) {
            this.table.query = QueryHelper.singleQuery(
                QueryHelper.andQuery(queryList),
            );
            this.table.queryTableData();
        } else {
            this.table.fetchTableData();
        }
    };

    resetSearch = () => {
        this.setName('');
        this.setUnitName('');
        this.setUseDate('');
        this.setStatus('');
    };

    render() {
        const {props, state} = this;

        return (
            <Container className="permission-approve">
                <div>
                    <PageTitle
                        title={props.language.systemManagement.subMenus.systemPermissionApprove}
                        breadcrumb={false}
                    />
                </div>
                <MultiTableSearch
                    searchInput={this.displaySearchInput()}
                    searchFunction={this.search}
                    resetFunction={this.resetSearch}
                />
                <TableCount count={state.tableCount}/>
                <Table data={state.tableData} columns={this.table.getTableHeader()}/>
                <Pagination
                    tableInstance={this.table}
                    totalPage={this.table.totalPage}
                    currentPage={this.table.currentPage}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
    setLoading: (payload) => dispatch(setLoading(payload)),
});

PermissionApprove.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionApprove);
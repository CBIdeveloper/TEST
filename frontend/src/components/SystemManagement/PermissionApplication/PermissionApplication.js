import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../../../lib/components/Container/Container';
import DateInput from '../../../lib/components/inputs/DateInput/DateInput';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Pagination from '../../../lib/components/Pagination/Pagination';

import { setLoading } from '../../../store/loading/slice';

import PermissionApplicationTable
    from '../../../utils/tables/systemManagement/PermissionApplicationTable/PermissionApplicationTable';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { dateObjectToDateTimeStringWithTimezone } from '../../../utils/parsers/dateParser';

import './PermissionApplication.scss';
import ButtonDiv from "../../../lib/components/ButtonDiv/ButtonDiv";
import { userHasRole } from "../../../utils/auth/auth";
import Path from "../../../utils/path/path";
import DateHelper from "../../../utils/helper/DateHelper";

class PermissionApplication extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            tableCount: 0,
            useDate: '',
        };
        this.table = new PermissionApplicationTable(this.setTableData, this.setTableCount);
    }

    async componentDidMount() {
        const { props } = this;
        props.setLoading(true);
        this.table.fetchTableData();
    }

    setTableData = (tableData) => {
        const { props } = this;
        const data = tableData.map((item, index) => ({
            ...item,
            index: index + this.table.currentSkip() + 1,
        }));
        this.setState({ tableData: data });
        props.setLoading(false);
    };

    setTableCount = (tableCount) => {
        this.setState({ tableCount });
    };

    setUseDate = (useDate) => {
        this.setState({ useDate });
    };

    displaySearchInput = () => {
        const { props, state } = this;
        return (
            <>
                <div className="date-containers">
                    <div className="use-date-container">
                        <div className="status-title">{props.language.permissionApplication.useDate}</div>
                        <DateInput
                            title=""
                            inputName=""
                            inputPlaceholder={props.language.permissionApplication.useDateHint}
                            inputValue={state.useDate}
                            setFieldValue={(field, value) => this.setUseDate(value)}
                            zenMode
                        />
                    </div>
                </div>
            </>
        );
    };

    search = () => {
        const { props, state } = this;
        const queryList = [];
        props.setLoading(true);
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
        this.setUseDate('');
    };

    displayAddButton = () => {
        const { props } = this;
        return (
            <ButtonDiv
                className="add-button"
                onClick={this.navigateToAddPage}
                display={userHasRole(166)}
            >
                {props.language.permissionApplication.add}
            </ButtonDiv>
        );
    };

    navigateToAddPage = () => {
        const { props } = this;
        props.history.push({
            pathname: `${props.location.pathname}/${Path.addPermissionApplicationPath}`,
        });
    };

    render() {
        const { props, state } = this;

        return (
            <Container className="permission-application">
                <div>
                    <PageTitle
                        title={props.language.systemManagement.subMenus.systemPermissionApplication}
                        breadcrumb={false}
                        postfixComponent={this.displayAddButton()}
                    />
                </div>
                <MultiTableSearch
                    searchInput={this.displaySearchInput()}
                    searchFunction={this.search}
                    resetFunction={this.resetSearch}
                />
                <TableCount count={state.tableCount} />
                <Table data={state.tableData} columns={this.table.getTableHeader()} />
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

PermissionApplication.propTypes = {
    language: PropTypes.objectOf(Object).isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionApplication);

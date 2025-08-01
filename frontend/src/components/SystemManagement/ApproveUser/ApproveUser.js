import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../../../lib/components/Container/Container';
import DateInput from '../../../lib/components/inputs/DateInput/DateInput';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Pagination from '../../../lib/components/Pagination/Pagination';
import SelectInput from '../../../lib/components/inputs/SelectInput/SelectInput';

import { setLoading } from '../../../store/loading/slice';

import ApiService from '../../../utils/api/ApiService';
import ApproveUserTable from '../../../utils/tables/systemManagement/ApproveUserTable/ApproveUserTable';
import DateHelper from '../../../utils/helper/DateHelper';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { getUserId } from '../../../utils/auth/auth';
import { dateObjectToDateTimeStringWithTimezone } from '../../../utils/parsers/dateParser';
import { unapprovedStatusType } from '../../../utils/constants/UserAccountAppliedStatusType';

import './ApproveUser.scss';

class ApproveUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      tableCount: 0,
      name: '',
      account: '',
      startDate: '',
      endDate: '',
      applyStatus: 0,
    };
    this.table = new ApproveUserTable(this.setTableData, this.setTableCount);
  }

  async componentDidMount() {
    const { props } = this;
    props.setLoading(true);
    await ApiService.sysUserAccount
      .readSysUserAccountById(getUserId())
      .then((response) => {
        this.table.userObject = response;
        // console.log(response)
        // this.table.fetchTableData();
        this.search();
      })
      .catch(() => {
        props.setLoading(false);
      });
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

  setName = (name) => {
    this.setState({ name });
  };

  setAccount = (account) => {
    this.setState({ account });
  };

  setStartDate = (startDate) => {
    this.setState({ startDate });
  };

  setEndDate = (endDate) => {
    this.setState({ endDate });
  };

  setApplyStatus = (applyStatus) => {
    this.setState({ applyStatus });
  };

  displaySearchInput = () => {
    const { state } = this;
    return (
      <>
        <div className="text-containers">
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="信箱關鍵字"
            inputValue={state.account}
            inputOnChange={(event) => this.setAccount(event.target.value)}
            zenMode
          />
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="姓名關鍵字"
            inputValue={state.name}
            inputOnChange={(event) => this.setName(event.target.value)}
            zenMode
          />
        </div>
        <div className="date-containers">
          <div className="start-date-container">
            <div className="status-title">申請日期：</div>
            <DateInput
              title=""
              inputName=""
              inputPlaceholder="開始日期"
              inputValue={state.startDate}
              setFieldValue={(field, value) => this.setStartDate(value)}
              maxDate={state.endDate || new Date()}
              zenMode
            />
          </div>
          <DateInput
            title=""
            inputName=""
            inputPlaceholder="結束日期"
            inputValue={state.endDate}
            setFieldValue={(field, value) => this.setEndDate(value)}
            minDate={state.startDate}
            maxDate={new Date()}
            zenMode
          />
        </div>
        <div className="dropdown-container">
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder="審核狀態"
            inputValue={state.applyStatus}
            options={unapprovedStatusType}
            setFieldValue={(field, value) => this.setApplyStatus(value)}
            zenMode
          />
        </div>
      </>
    );
  };

  search = () => {
    const { props, state } = this;
    const queryList = [];
    props.setLoading(true);
    if (state.name !== '') {
      queryList.push(QueryHelper.contains('name', state.name, 'string'));
    }
    if (state.account !== '') {
      queryList.push(QueryHelper.contains('email', state.account, 'string'));
    }
    if (state.startDate !== '') {
      queryList.push(
        QueryHelper.greater(
          'createdAt',
          dateObjectToDateTimeStringWithTimezone(state.startDate),
        ),
      );
    }
    if (state.endDate !== '') {
      queryList.push(
        QueryHelper.less(
          'createdAt',
          dateObjectToDateTimeStringWithTimezone(
            DateHelper.addDays(state.endDate, 1),
          ),
        ),
      );
    }
    if (state.applyStatus !== '') {
      queryList.push(
        QueryHelper.equal(
          'userAccountAppliedStatus',
          state.applyStatus,
          'number',
        ),
      );
    }
    this.table.query = QueryHelper.singleQuery(
      QueryHelper.andQuery([...queryList, this.table.queryPrefix()]),
    );
    this.table.currentPage = 1;
    if (state.applyStatus === 2) {
      this.table.queryTableDataWithOrder();
    } else {
      this.table.queryTableData();
    }
  };

  resetSearch = () => {
    this.setAccount('');
    this.setName('');
    this.setStartDate('');
    this.setEndDate('');
  };

  render() {
    const { props, state } = this;

    return (
      <Container className="approve-user">
        <div>
          <PageTitle
            title={props.language.systemManagement.subMenus.approveUser}
            breadcrumb={false}
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

ApproveUser.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveUser);

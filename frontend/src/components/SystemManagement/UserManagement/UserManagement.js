import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
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
import DateHelper from '../../../utils/helper/DateHelper';
import UserTable from '../../../utils/tables/systemManagement/UserTable/UserTable';
import Path from '../../../utils/path/path';
import QueryHelper from '../../../utils/helper/QueryHelper';
import UrlParser from '../../../utils/parsers/urlParser';
import { inputUserStateType } from '../../../utils/constants/UserStateType';
import { getUserId, userHasRole } from '../../../utils/auth/auth';
import { dateObjectToDateTimeStringWithTimezone } from '../../../utils/parsers/dateParser';

import './UserManagement.scss';

class UserManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      tableCount: 0,
      name: '',
      workPlace: '',
      startDate: '',
      endDate: '',
      userState: '',
    };
    this.table = new UserTable(this.setTableData, this.setTableCount);
  }

  async componentDidMount() {
    const { props } = this;
    props.setLoading(true);
    this.table.fetchTableData();
    // await ApiService.sysUserAccount
    //   .readSysUserAccountById(getUserId())
    //   .then((response) => {
    //     this.table.userObject = response;
    //     this.table.fetchTableData();
    //   })
    //   .catch(() => {
    //     props.setLoading(false);
    //   });
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

  setWorkPlace = (workPlace) => {
    this.setState({ workPlace });
  };

  setStartDate = (startDate) => {
    this.setState({ startDate });
  };

  setEndDate = (endDate) => {
    this.setState({ endDate });
  };

  setUserState = (userState) => {
    this.setState({ userState });
  };

  displaySearchInput = () => {
    const { state } = this;
    return (
      <>
        <div className="text-containers">
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="編管單位"
            inputValue={state.workPlace}
            inputOnChange={(event) => this.setWorkPlace(event.target.value)}
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
            inputPlaceholder="啟用狀態"
            inputValue={state.userState}
            options={inputUserStateType}
            setFieldValue={(field, value) => this.setUserState(value)}
            zenMode
          />
        </div>
      </>
    );
  };

  displayAddButton = () => {
    const { props } = this;
    return (
      <ButtonDiv
        className="add-button"
        onClick={this.handleAddOnClicked}
        display={userHasRole(151)}
      >
        {props.language.userManagement.add}
      </ButtonDiv>
    );
  };

  handleAddOnClicked = () => {
    const { props } = this;
    props.history.push({
      pathname: UrlParser([
        props.location.pathname,
        Path.addUserManagementPath,
      ]),
    });
  };

  search = () => {
    const { props, state } = this;
    const queryList = [this.table.queryPrefix()];
    props.setLoading(true);
    if (state.name !== '') {
      queryList.push(QueryHelper.contains('name', state.name, 'string'));
    }
    if (state.account !== '') {
      queryList.push(
        QueryHelper.contains('workPlace', state.workPlace, 'string'),
      );
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
    if (state.userState !== '') {
      queryList.push(QueryHelper.equal('state', state.userState, 'string'));
    }
    this.table.query = QueryHelper.singleQuery(
      QueryHelper.andQuery([...queryList]),
    );
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  resetSearch = () => {
    this.setWorkPlace('');
    this.setName('');
    this.setStartDate('');
    this.setEndDate('');
  };

  render() {
    const { props, state } = this;

    return (
      <Container className="user-management">
        <div>
          <PageTitle
            title={props.language.systemManagement.subMenus.userManagement}
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

UserManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManagement),
);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../../../lib/components/inputs/DateInput/DateInput';
import MultiTableSearch from '../../../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import Table from '../../../../lib/components/Table/Table';
import TableCount from '../../../../lib/components/TableCount/TableCount';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';
import Pagination from '../../../../lib/components/Pagination/Pagination';

import MobilizationProgramManagementTable from '../../../../utils/tables/retrievalService/PlanDownloadManagement/MobilizationProgramManagementTable';
import Path from '../../../../utils/path/path';
import QueryHelper from '../../../../utils/helper/QueryHelper';
import UrlParser from '../../../../utils/parsers/urlParser';
import { dateObjectToDateString } from '../../../../utils/parsers/dateParser';
import { userHasRole } from '../../../../utils/auth/auth';

import './MobilizationProgramManagement.scss';

class MobilizationProgramManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      searchTitle: '',
      startDate: '',
      endDate: '',
      tableCount: 0,
    };
    this.table = new MobilizationProgramManagementTable(
      this.setTableData,
      this.setTableCount,
    );
  }

  componentDidMount() {
    this.table.fetchTableData();
  }

  setTableData = (tableData) => {
    const data = tableData.map((item, index) => ({
      ...item,
      index: index + this.table.currentSkip() + 1,
    }));
    this.setState({ tableData: data });
  };

  setTableCount = (tableCount) => {
    this.setState({ tableCount });
  };

  setSearchTitle = (searchTitle) => {
    this.setState({ searchTitle });
  };

  setStartDate = (startDate) => {
    this.setState({ startDate });
  };

  setEndDate = (endDate) => {
    this.setState({ endDate });
  };

  resetSearch = () => {
    this.setSearchTitle('');
    this.setStartDate('');
    this.setEndDate('');
  };

  searchInput = () => {
    const { state } = this;

    return (
      <div className="search-containers">
        <div className="text-containers">
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="動員綱領關鍵字"
            inputValue={state.searchTitle}
            inputOnChange={(event) => this.setSearchTitle(event.target.value)}
            zenMode
            full
          />
        </div>
        <div className="date-containers">
          <DateInput
            title=""
            inputName=""
            inputPlaceholder="開始日期"
            inputValue={state.startDate}
            setFieldValue={(field, value) => this.setStartDate(value)}
            maxDate={state.endDate}
            zenMode
          />
          <DateInput
            title=""
            inputName=""
            inputPlaceholder="結束日期"
            inputValue={state.endDate}
            setFieldValue={(field, value) => this.setEndDate(value)}
            minDate={state.startDate}
            zenMode
          />
        </div>
      </div>
    );
  };

  search = () => {
    const { state } = this;
    const queryList = [];
    if (state.searchTitle !== '') {
      queryList.push(
        QueryHelper.contains(
          'mobilizationProgramSubject',
          state.searchTitle,
          'string',
        ),
      );
    }
    if (state.startDate !== '') {
      queryList.push(
        QueryHelper.greater(
          'releaseDate',
          dateObjectToDateString(state.startDate),
        ),
      );
    }
    if (state.endDate !== '') {
      queryList.push(
        QueryHelper.less(
          'releaseDate',
          dateObjectToDateString(state.endDate),
        ),
      );
    }
    if (queryList.length > 0) {
      this.table.query = QueryHelper.multipleAndQuery(queryList);
    } else {
      this.table.query = '';
    }
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  navigateToAddPage = () => {
    const { props } = this;
    props.history.push({
      pathname: UrlParser([
        props.location.pathname,
        Path.addMobilizationProgramPath,
      ]),
    });
  };

  displayAddButton = () => {
    const { props } = this;
    return (
      <ButtonDiv
        className="add-button"
        onClick={this.navigateToAddPage}
        display={userHasRole(63)}
      >
        {props.language.mobilizationProgramManagement.add}
      </ButtonDiv>
    );
  };

  render() {
    const { props, state } = this;

    return (
      <div className="mobilization-program-management">
        <PageTitle
          title={
            props.language.retrievalService.subMenus
              .mobilizationProgramManagement
          }
          breadcrumb={false}
          postfixComponent={this.displayAddButton()}
        />
        <MultiTableSearch
          searchInput={this.searchInput()}
          resetFunction={this.resetSearch}
          searchFunction={this.search}
        />
        <TableCount count={state.tableCount} />
        <Table data={state.tableData} columns={this.table.getTableHeader()} />
        <Pagination
          tableInstance={this.table}
          currentPage={this.table.currentPage}
          totalPage={this.table.totalPage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationProgramManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobilizationProgramManagement),
);

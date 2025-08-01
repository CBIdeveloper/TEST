import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../lib/components/Container/Container';
import DateInput from '../../../lib/components/inputs/DateInput/DateInput';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Pagination from '../../../lib/components/Pagination/Pagination';
import SelectInput from '../../../lib/components/inputs/SelectInput/SelectInput';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';

import DateHelper from '../../../utils/helper/DateHelper';
import ModificationSearchTable from '../../../utils/tables/systemManagement/ModificationSearchTable/ModificationSearchTable';
import ModificationStatusType from '../../../utils/constants/ModificationStatusType';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { dateObjectToDateTimeStringWithTimezone } from '../../../utils/parsers/dateParser';

import './ModificationSearch.scss';

class ModificationSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.state = {
      tableData: [],
      tableCount: 0,
      featureName: '',
      sysAccount: '',
      modificationStatus: 'S',
      modificationStartDate: today,
      modificationEndDate: '',
    };
    this.table = new ModificationSearchTable(
      this.setTableData,
      this.setTableCount,
    );
  }

  componentDidMount() {
    this.search();
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

  setFeatureName = (featureName) => {
    this.setState({ featureName });
  };

  setSysAccount = (sysAccount) => {
    this.setState({ sysAccount });
  };

  setModificationStatus = (modificationStatus) => {
    this.setState({ modificationStatus });
  };

  setStartDate = (modificationStartDate) => {
    this.setState({ modificationStartDate });
  };

  setEndDate = (modificationEndDate) => {
    this.setState({ modificationEndDate });
  };

  displaySearchInput = () => {
    const { state } = this;
    return (
      <>
        <div className="text-containers">
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="關鍵字"
            inputValue={state.featureName}
            inputOnChange={(event) => this.setFeatureName(event.target.value)}
            zenMode
          />
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="帳號"
            inputValue={state.sysAccount}
            inputOnChange={(event) => this.setSysAccount(event.target.value)}
            zenMode
          />
          <div className="status-container">
            <div className="status-title">異動狀態：</div>
            <SelectInput
              title="異動狀態："
              inputName=""
              inputPlaceholder="狀態"
              inputValue={state.modificationStatus}
              setFieldValue={(field, value) =>
                this.setModificationStatus(value)
              }
              options={ModificationStatusType}
              zenMode
            />
          </div>
        </div>
        <div className="date-containers">
          <div className="start-date-container">
            <div className="status-title">資料異動日期：</div>
            <DateInput
              title=""
              inputName=""
              inputPlaceholder="開始日期"
              inputValue={state.modificationStartDate}
              setFieldValue={(field, value) => this.setStartDate(value)}
              maxDate={state.modificationEndDate || new Date()}
              zenMode
            />
          </div>
          <DateInput
            title=""
            inputName=""
            inputPlaceholder="結束日期"
            inputValue={state.modificationEndDate}
            setFieldValue={(field, value) => this.setEndDate(value)}
            minDate={state.modificationStartDate}
            maxDate={new Date()}
            zenMode
          />
        </div>
      </>
    );
  };

  search = () => {
    const { state } = this;
    const queryList = [];
    if (state.featureName !== '') {
      queryList.push(
        QueryHelper.contains('description', state.featureName, 'string'),
      );
    }
    if (state.sysAccount !== '') {
      queryList.push(
        QueryHelper.contains(
          ['assoiciatedUserAccount', 'account'],
          state.sysAccount,
          'string',
        ),
      );
    }
    if (state.modificationStatus !== '') {
      queryList.push(
        QueryHelper.contains('state', state.modificationStatus, 'string'),
      );
    }
    if (
      state.modificationStartDate !== '' &&
      state.modificationStartDate !== null
    ) {
      queryList.push(
        QueryHelper.greater(
          'loggedAt',
          dateObjectToDateTimeStringWithTimezone(state.modificationStartDate),
        ),
      );
    }
    if (
      state.modificationEndDate !== '' &&
      state.modificationEndDate !== null
    ) {
      queryList.push(
        QueryHelper.less(
          'loggedAt',
          dateObjectToDateTimeStringWithTimezone(
            DateHelper.addDays(state.modificationEndDate, 1),
          ),
        ),
      );
    }
    if (queryList.length === 0) {
      this.table.query = '';
    } else {
      this.table.query = QueryHelper.singleQuery(
        QueryHelper.andQuery(queryList),
      );
    }
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  resetSearch = () => {
    this.setFeatureName('');
    this.setSysAccount('');
    this.setModificationStatus('1');
    this.setStartDate(new Date());
    this.setEndDate(new Date());
  };

  exportExcel = () => {
    const { state } = this;
    console.log(state.tableData);
  };

  exportOds = () => {
    const { state } = this;
    console.log(state.tableData);
  };

  render() {
    const { props, state } = this;

    return (
      <Container className="modification-search">
        <div>
          <PageTitle
            title={props.language.systemManagement.subMenus.modificationSearch}
            breadcrumb={false}
          />
        </div>
        <MultiTableSearch
          searchInput={this.displaySearchInput()}
          searchFunction={this.search}
          resetFunction={this.resetSearch}
        />
        <div className="count-export-container">
          <TableCount count={state.tableCount} />
          <div className="export-button-container">
            <ButtonDiv className="export-button" onClick={this.exportExcel}>
              {props.language.modificationSearch.exportExcel}
            </ButtonDiv>
            <ButtonDiv className="export-button" onClick={this.exportOds}>
              {props.language.modificationSearch.exportOds}
            </ButtonDiv>
          </div>
        </div>
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

const mapDispatchToProps = (dispatch) => ({});

ModificationSearch.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModificationSearch);

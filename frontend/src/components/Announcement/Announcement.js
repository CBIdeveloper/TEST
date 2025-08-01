import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../../lib/components/Container/Container';
import DateInput from '../../lib/components/inputs/DateInput/DateInput';
import Table from '../../lib/components/Table/Table';
import TableCount from '../../lib/components/TableCount/TableCount';
import TextInput from '../../lib/components/inputs/TextInput/TextInput';
import MultiTableSearch from '../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../lib/components/PageTitle/PageTitle';
import Pagination from '../../lib/components/Pagination/Pagination';

import AnnouncementTable from '../../utils/tables/systemManagement/AnnouncementTable/AnnouncementTable';
import QueryHelper from '../../utils/helper/QueryHelper';
import { dateObjectToDateString } from '../../utils/parsers/dateParser';

import './Announcement.scss';

class Announcement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      tableCount: 0,
      title: '',
      startDate: '',
      endDate: '',
    };
    this.table = new AnnouncementTable(this.setTableData, this.setTableCount);
    this.table.queryPrefix = this.table.todayQueryPrefix;
  }

  componentDidMount() {
    this.table.fetchTodayTableData();
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

  setTitle = (title) => {
    this.setState({ title });
  };

  setStartDate = (startDate) => {
    this.setState({ startDate });
  };

  setEndDate = (endDate) => {
    this.setState({ endDate });
  };

  displaySearchInput = () => {
    const { state } = this;
    return (
      <>
        <div className="text-containers">
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="主旨關鍵字"
            inputValue={state.title}
            inputOnChange={(event) => this.setTitle(event.target.value)}
            zenMode
          />
        </div>
        <div className="date-containers">
          <div className="start-date-container">
            <div className="status-title">公告開始日期：</div>
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
      </>
    );
  };

  search = () => {
    const { state } = this;
    const queryList = [this.table.todayQueryPrefix()];
    if (state.title !== '') {
      queryList.push(QueryHelper.contains('title', state.title, 'string'));
    }
    if (state.startDate !== '') {
      queryList.push(
        QueryHelper.greater(
          'announcementBeganAt',
          dateObjectToDateString(state.startDate),
        ),
      );
    }
    if (state.endDate !== '') {
      queryList.push(
        QueryHelper.less(
          'announcementBeganAt',
          dateObjectToDateString(state.endDate),
        ),
      );
    }
    this.table.query = QueryHelper.singleQuery(QueryHelper.andQuery(queryList));
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  resetSearch = () => {
    this.setTitle('');
    this.setStartDate('');
    this.setEndDate('');
  };

  render() {
    const { props, state } = this;

    return (
      <div className="announcement">
        <Container className="announcement-container" breadcrumb={false}>
          <div>
            <PageTitle
              title={props.language.latestNews.title}
              breadcrumb={false}
            />
          </div>
          <MultiTableSearch
            searchInput={this.displaySearchInput()}
            searchFunction={this.search}
            resetFunction={this.resetSearch}
          />
          <TableCount count={state.tableCount} />
          <Table
            data={state.tableData}
            columns={this.table.getViewTableHeader()}
          />
          <Pagination
            tableInstance={this.table}
            totalPage={this.table.totalPage}
            currentPage={this.table.currentPage}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

Announcement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Announcement);

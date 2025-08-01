import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../../lib/components/inputs/DateInput/DateInput';
import SectionTitle from '../../../lib/components/SectionTitle/SectionTitle';
import SelectInput from '../../../lib/components/inputs/SelectInput/SelectInput';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import Pagination from '../../../lib/components/Pagination/Pagination';

import MobilizationStrategyTable from '../../../utils/tables/businessManagement/SubMenuTable/MobilizationStrategyTable';
import Path from '../../../utils/path/path';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { dateObjectToDateString } from '../../../utils/parsers/dateParser';
import { userHasRole } from '../../../utils/auth/auth';

import './MobilizationStrategy.scss';

class MobilizationStrategy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      announcementUnit: '',
      announcementUser: '',
      startDate: '',
      endDate: '',
      announcementUnitList: [],
      tableData: [],
      tableCount: 0,
      Count: 0,
    };
    this.table = new MobilizationStrategyTable(
      this.setTableData,
      this.setTableCount,
    );
    this.table.typeId = 3;
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
    let Count = this.state.Count;
    if (Count == 0) {
      const announcementUnits = Array.from(
        new Set(data.map((item) => item.announcementUnit)),
      ).map((announcementUnit) => ({
        text: announcementUnit,
        value: announcementUnit,
      }));
      this.setAnnouncementUnitList(announcementUnits);
    }
    this.setState({ Count: Count + 1 });
  };

  setTableCount = (tableCount) => {
    this.setState({ tableCount });
  };

  setTitle = (title) => {
    this.setState({ title });
  };

  setAnnouncementUnit = (announcementUnit) => {
    this.setState({ announcementUnit });
  };

  setAnnouncementUnitList = (announcementUnitList) => {
    this.setState({ announcementUnitList });
  };

  setAnnouncementUser = (announcementUser) => {
    this.setState({ announcementUser });
  };

  setStartDate = (startDate) => {
    this.setState({ startDate });
  };

  setEndDate = (endDate) => {
    this.setState({ endDate });
  };

  resetSearch = () => {
    this.setTitle('');
    this.setAnnouncementUnit('');
    this.setAnnouncementUser('');
    this.setStartDate('');
    this.setEndDate('');
  };

  search = () => {
    const { state } = this;
    const queryList = [];
    if (state.title !== '') {
      queryList.push(QueryHelper.contains('title', state.title, 'string'));
    }
    if (state.announcementUser !== '') {
      queryList.push(
        QueryHelper.contains(
          ['announcedUserAccount', 'name'],
          state.announcementUser,
          'string',
        ),
      );
    }
    if (state.announcementUnit !== '') {
      queryList.push(
        QueryHelper.contains(
          ['announcedUnit'],
          state.announcementUnit,
          'string',
        ),
      );
    }
    if (state.startDate !== '') {
      queryList.push(
        QueryHelper.greater(
          'announcementDate',
          dateObjectToDateString(state.startDate),
        ),
      );
    }
    if (state.endDate !== '') {
      queryList.push(
        QueryHelper.less(
          'announcementDate',
          dateObjectToDateString(state.endDate),
        ),
      );
    }
    this.table.query = QueryHelper.multipleAndQuery([
      ...queryList,
      this.table.queryPrefix(),
    ]);
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  searchInput = () => {
    const { state } = this;
    return (
      <div className="search-containers">
        <div className="text-containers">
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="標題"
            inputValue={state.title}
            inputOnChange={(event) => this.setTitle(event.target.value)}
            zenMode
          />
          <SelectInput
            title=""
            inputName=""
            inputPlaceholder="公告單位"
            inputValue={state.announcementUnit}
            setFieldValue={(field, value) => this.setAnnouncementUnit(value)}
            options={state.announcementUnitList}
            zenMode
          />
          <TextInput
            title=""
            inputName=""
            inputPlaceholder="公告人員"
            inputValue={state.announcementUser}
            inputOnChange={(event) =>
              this.setAnnouncementUser(event.target.value)
            }
            zenMode
          />
        </div>
        <div className="date-containers">
          <DateInput
            title=""
            inputName=""
            inputPlaceholder="開始日期"
            inputValue={state.startDate}
            setFieldValue={(field, value) => this.setStartDate(value)}
            maxDate={state.endDate || new Date()}
            zenMode
          />
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
      </div>
    );
  };

  render() {
    const { props, state } = this;

    return (
      <div className="mobilization-strategy">
        <div className="title-container">
          <SectionTitle
            title={
              props.language.businessManagement.subMenus.mobilizationStrategy
            }
          />
          <ButtonDiv display={userHasRole(124)}>
            <NavLink
              to={`${props.location.pathname}/${Path.addMobilizationStrategyPath}`}
              className="add-button"
            >
              {props.language.businessManagement.add}
            </NavLink>
          </ButtonDiv>
        </div>
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

MobilizationStrategy.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobilizationStrategy),
);

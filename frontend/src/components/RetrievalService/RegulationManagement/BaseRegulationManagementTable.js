import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import Pagination from '../../../lib/components/Pagination/Pagination';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';

import Path from '../../../utils/path/path';
import RegulationManagementTable from '../../../utils/tables/retrievalService/RegulationManagement/RegulationManagementTable';
import QueryHelper from '../../../utils/helper/QueryHelper';
import QueryType from '../../../utils/types/QueryType';
import { createQuery } from '../../../utils/parsers/queryParser';
import { userHasRole } from '../../../utils/auth/auth';

import './BaseRegulationManagementTable.scss';

class BaseRegulationManagementTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [], searchTitle: '', tableCount: 0 };
    this.table = new RegulationManagementTable(
      this.setTableData,
      this.setTableCount,
    );
    this.table.typeId = props.typeId;
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

  setSearchTitle = (searchTitle) => {
    this.setState({ searchTitle });
  };

  setTableCount = (tableCount) => {
    this.setState({ tableCount });
  };

  resetSearch = () => {
    this.setSearchTitle('');
  };

  searchInput = () => {
    const { state } = this;
    return (
      <TextInput
        full
        title=""
        inputName=""
        inputPlaceholder="法規名稱"
        inputValue={state.searchTitle}
        inputOnChange={(event) => this.setSearchTitle(event.target.value)}
        zenMode
      />
    );
  };

  search = () => {
    const { state } = this;
    const queryList = [];
    if (state.searchTitle !== '') {
      queryList.push(
        QueryHelper.contains('regulationName', state.searchTitle, 'string'),
      );
    }
    this.table.query = QueryHelper.multipleAndQuery([
      ...queryList,
      this.table.queryPrefix(),
    ]);
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  navigateToAddPage = () => {
    const { props } = this;
    const query = createQuery({
      [QueryType.TYPE]: props.typeId,
    });
    props.history.push({
      pathname: Path.addRegulationPath,
      search: query,
    });
  };

  displayAddButton = () => {
    const { props } = this;
    return (
      <ButtonDiv
        className="add-button"
        onClick={this.navigateToAddPage}
        display={userHasRole(68)}
      >
        {props.language.baseRegulationManagementTable.add}
      </ButtonDiv>
    );
  };

  render() {
    const { props, state } = this;

    return (
      <div className="base-regulation-management-table">
        <PageTitle
          title={props.title}
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

BaseRegulationManagementTable.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  typeId: PropTypes.number.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BaseRegulationManagementTable),
);

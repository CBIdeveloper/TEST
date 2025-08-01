import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import Pagination from '../../../lib/components/Pagination/Pagination';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';

import RegulationTable from '../../../utils/tables/retrievalService/Regulation/RegulationTable';
import QueryHelper from '../../../utils/helper/QueryHelper';

import './BaseRegulationDetailTable.scss';

class BaseRegulationDetailTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [], searchTitle: '', tableCount: 0 };
    this.table = new RegulationTable(this.setTableData, this.setTableCount);
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

  render() {
    const { props, state } = this;

    return (
      <div className="base-regulation-detail-table">
        <PageTitle title={props.title} />
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

BaseRegulationDetailTable.propTypes = {
  title: PropTypes.string.isRequired,
  typeId: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaseRegulationDetailTable);

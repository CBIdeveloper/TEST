import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../lib/components/Container/Container';
import MultiTableSearch from '../../../lib/components/MultiTableSearch/MultiTableSearch';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Pagination from '../../../lib/components/Pagination/Pagination';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';

import SystemMenuTable from '../../../utils/tables/systemManagement/SystemMenuTable/SystemMenuTable';
import Path from '../../../utils/path/path';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { userHasRole } from '../../../utils/auth/auth';

import './SystemMenu.scss';

class SystemMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [], tableCount: 0, menuName: '' };
    this.table = new SystemMenuTable(this.setTableData, this.setTableCount);
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

  setMenuName = (menuName) => {
    this.setState({ menuName });
  };

  displayAddButton = () => {
    const { props } = this;
    return (
      <ButtonDiv
        className="add-button"
        onClick={this.navigateToAddPage}
        display={userHasRole(39)}
      >
        {props.language.systemMenu.add}
      </ButtonDiv>
    );
  };

  navigateToAddPage = () => {
    const { props } = this;
    props.history.push({
      pathname: `${props.location.pathname}/${Path.addSystemMenuPath}`,
    });
  };

  displaySearchInput = () => {
    const { state } = this;
    return (
      <TextInput
        title=""
        inputName=""
        inputPlaceholder="選單關鍵字"
        inputValue={state.menuName}
        inputOnChange={(event) => this.setMenuName(event.target.value)}
        zenMode
      />
    );
  };

  search = () => {
    const { state } = this;
    if (state.menuName !== '') {
      this.table.query = QueryHelper.singleQuery(
        QueryHelper.contains('menuName', state.menuName, 'string'),
      );
    } else {
      this.table.query = '';
    }
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  resetSearch = () => {
    this.setMenuName('');
  };

  render() {
    const { props, state } = this;

    return (
      <Container>
        <div className="system-menu">
          <PageTitle
            title={props.language.systemManagement.subMenus.systemMenu}
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

const mapDispatchToProps = (dispatch) => ({});

SystemMenu.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SystemMenu),
);

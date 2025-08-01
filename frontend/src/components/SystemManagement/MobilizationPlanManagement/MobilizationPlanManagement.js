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

import MobilizationPlanTable from '../../../utils/tables/systemManagement/MobilizationPlanTable/MobilizationPlanTable';
import Path from '../../../utils/path/path';
import QueryHelper from '../../../utils/helper/QueryHelper';
import { userHasRole } from '../../../utils/auth/auth';

import './MobilizationPlanManagement.scss';

class MobilizationPlanManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [], tableCount: 0, planName: '' };
    this.table = new MobilizationPlanTable(
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

  setPlanName = (planName) => {
    this.setState({ planName });
  };

  displayAddButton = () => {
    const { props } = this;
    return (
      <ButtonDiv
        className="add-button"
        onClick={this.navigateToAddPage}
        display={userHasRole(45)}
      >
        {props.language.mobilizationPlanManagement.add}
      </ButtonDiv>
    );
  };

  navigateToAddPage = () => {
    const { props } = this;
    props.history.push({
      pathname: `${props.location.pathname}/${Path.addMobilizationPlanManagementPath}`,
    });
  };

  displaySearchInput = () => {
    const { state } = this;
    return (
      <TextInput
        title=""
        inputName=""
        inputPlaceholder="動員方案關鍵字"
        inputValue={state.planName}
        inputOnChange={(event) => this.setPlanName(event.target.value)}
        zenMode
      />
    );
  };

  search = () => {
    const { state } = this;
    if (state.planName !== '') {
      this.table.query = QueryHelper.singleQuery(
        QueryHelper.contains('planName', state.planName, 'string'),
      );
    } else {
      this.table.query = '';
    }
    this.table.currentPage = 1;
    this.table.queryTableData();
  };

  resetSearch = () => {
    this.setPlanName('');
  };

  render() {
    const { props, state } = this;

    return (
      <Container>
        <div className="mobilization-plan-management-system">
          <PageTitle
            title={
              props.language.systemManagement.subMenus
                .mobilizationPlanManagement
            }
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

MobilizationPlanManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobilizationPlanManagement),
);

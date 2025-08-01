import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import PageTitle from '../../../../../lib/components/PageTitle/PageTitle';
import Table from '../../../../../lib/components/Table/Table';
import TableCount from '../../../../../lib/components/TableCount/TableCount';
import Pagination from '../../../../../lib/components/Pagination/Pagination';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationPlanManagementDetailTable from '../../../../../utils/tables/retrievalService/PlanDownloadManagement/MobilizationPlanManagementDetailTable';
import Path from '../../../../../utils/path/path';
import QueryType from '../../../../../utils/types/QueryType';
import { createQuery } from '../../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../../utils/auth/auth';

import './MobilizationPlanDetailManagement.scss';

class MobilizationPlanDetailManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [], id: null, planTitle: '', tableCount: 0 };
    this.table = new MobilizationPlanManagementDetailTable(
      this.setTableData,
      this.setTableCount,
    );
  }

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.query.queryObject !== prevProps.query.queryObject) {
      this.initState();
    }
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

  setId = (id) => {
    this.setState({ id });
  };

  setPlanTitle = (planTitle) => {
    this.setState({ planTitle });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    this.setId(id);
    if (id !== null) {
      this.table.planId = id;
      ApiService.mobilizationPlan
        .readMobilizationPlanById(id)
        .then((response) => {
          this.setPlanTitle(response.planName);
          this.table.fetchTableData();
        });
    }
  };

  handleAddOnClicked = () => {
    const { props, state } = this;
    const query = createQuery({
      [QueryType.ID]: state.id,
    });
    props.history.push({
      pathname: Path.addMobilizationPlanPath,
      search: query,
    });
  };

  displayAddButton = () => {
    const { props } = this;
    return (
      <ButtonDiv
        className="add-button"
        onClick={this.handleAddOnClicked}
        display={userHasRole(58)}
      >
        {props.language.mobilizationPlanDetailManagement.add}
      </ButtonDiv>
    );
  };

  render() {
    const { props, state } = this;

    return (
      <div className="mobilization-plan-detail-management">
        <PageTitle
          title={state.planTitle}
          breadcrumb={false}
          postfixComponent={this.displayAddButton()}
        />
        <TableCount count={state.tableCount} />
        <Table data={state.tableData} columns={this.table.getTableHeader()} />
        <Pagination
          tableInstance={this.table}
          currentPage={this.table.currentPage}
          totalPage={this.table.totalPage}
        />
        <ButtonDiv className="normal-button" onClick={props.history.goBack}>
          {props.language.mobilizationPlanDetailManagement.back}
        </ButtonDiv>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationPlanDetailManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MobilizationPlanDetailManagement),
);

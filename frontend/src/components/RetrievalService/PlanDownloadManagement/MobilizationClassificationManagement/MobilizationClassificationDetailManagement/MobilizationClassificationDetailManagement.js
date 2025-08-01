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
import MobilizationClassificationManagementDetailTable from '../../../../../utils/tables/retrievalService/PlanDownloadManagement/MobilizationClassificationManagementDetailTable';
import Path from '../../../../../utils/path/path';
import QueryType from '../../../../../utils/types/QueryType';
import { createQuery } from '../../../../../utils/parsers/queryParser';
import { userHasRole } from '../../../../../utils/auth/auth';

import './MobilizationClassificationDetailManagement.scss';

class MobilizationClassificationDetailManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      id: null,
      classificationTitle: '',
      tableCount: 0,
    };
    this.table = new MobilizationClassificationManagementDetailTable(
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

  setClassificationTitle = (classificationTitle) => {
    this.setState({ classificationTitle });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    this.setId(id);
    if (id !== null) {
      this.table.classificationId = id;
      ApiService.mobilizationClassification
        .readMobilizationClassificationById(id)
        .then((response) => {
          this.setClassificationTitle(response.classificationName);
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
      pathname: Path.addMobilizationClassificationPath,
      search: query,
    });
  };

  displayAddButton = () => {
    const { props } = this;
    return (
      <ButtonDiv
        className="add-button"
        onClick={this.handleAddOnClicked}
        display={userHasRole(48)}
      >
        {props.language.mobilizationClassificationDetailManagement.add}
      </ButtonDiv>
    );
  };

  render() {
    const { props, state } = this;

    return (
      <div className="mobilization-classification-detail-management">
        <PageTitle
          title={state.classificationTitle}
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
          {props.language.mobilizationClassificationDetailManagement.back}
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

MobilizationClassificationDetailManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MobilizationClassificationDetailManagement),
);

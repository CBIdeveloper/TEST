import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../lib/components/Container/Container';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Table from '../../../lib/components/Table/Table';

import ApiService from '../../../utils/api/ApiService';
import CriteriaTable from '../../../utils/tables/dataSearch/CriteriaTable/CriteriaTable';
import DataSearchConfig from '../../../utils/config/dataSearch/dataSearchConfig';
import QueryType from '../../../utils/types/QueryType';

import './Criteria.scss';

class Criteria extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryObject: {},
      tableData: [],
      name: '',
    };
    this.table = new CriteriaTable();
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

  setCategoryObject = (categoryObject) => {
    this.setState({ categoryObject });
  };

  setTableData = (tableData) => {
    this.setState({ tableData });
  };

  setName = (name) => {
    this.setState({ name });
  };

  initState = () => {
    const { props } = this;
    const code = props.query.queryObject.get(QueryType.CODE);
    if (code !== null) {
      const configItem = DataSearchConfig.find(
        (item) => item.code === code,
      );
      if (configItem !== undefined) {
        // ApiService.braidingCategory
        //   .readBraidingCategoryByCode(configItem.code)
        //   .then((response) => {
        //     this.setName(response.fullName);
        //   });
        this.setCategoryObject(configItem);
        this.setTableData(configItem.criteriaList);
      }
    }
  };

  render() {
    const { props, state } = this;

    return (
      <div className="criteria">
        <Container breadcrumb={false}>
          <PageTitle title={props.language.dataSearch.subMenus.criteria} />
          <div className="mobilization-container">
            <div className="plan-name">
              {state.categoryObject.mobilizationPlan}
            </div>
            <div className="classification-name">
              {state.categoryObject.mobilizationClassification}
            </div>
            <div className="category-name">{state.categoryObject.name}</div>
          </div>
          <Table data={state.tableData} columns={this.table.getTableHeader()} />
          <div className="button-group">
            <ButtonDiv className="back-button" onClick={props.history.goBack}>
              {props.language.criteria.back}
            </ButtonDiv>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

Criteria.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Criteria),
);

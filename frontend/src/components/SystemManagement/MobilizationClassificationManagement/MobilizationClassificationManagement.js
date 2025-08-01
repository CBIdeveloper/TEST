import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../lib/components/Container/Container';
import FormRow from '../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../lib/components/SectionTitle/SectionTitle';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import Pagination from '../../../lib/components/Pagination/Pagination';

import ApiService from '../../../utils/api/ApiService';
import MobilizationPlanForm from '../../../utils/forms/systemManagement/MobilizationPlanForm';
import MobilizationPlanRequest from '../../../utils/dataModels/MobilizationPlan/MobilizationPlanRequest';
import MobilizationClassificationTable from '../../../utils/tables/systemManagement/MobilizationClassificationTable/MobilizationClassificationTable';
import ModalHelper from '../../../utils/helper/ModalHelper';
import Path from '../../../utils/path/path';
import QueryType from '../../../utils/types/QueryType';
import { createQuery } from '../../../utils/parsers/queryParser';
import { userHasRole } from '../../../utils/auth/auth';

import './MobilizationClassificationManagement.scss';

class MobilizationClassificationManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      tableData: [],
      tableCount: 0,
      formInitialValue: null,
    };
    this.table = new MobilizationClassificationTable(
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

  setId = (id) => {
    this.setState({ id });
  };

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

  setFormInitialValue = (formInitialValue) => {
    this.setState({ formInitialValue });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      this.table.mobilizationPlanId = id;
      this.table.fetchTableData();
      ApiService.mobilizationPlan
        .readMobilizationPlanById(id)
        .then((response) => {
          this.setFormInitialValue(response);
        });
    }
  };

  onSubmit = (values) => {
    const { state } = this;
    const request = new MobilizationPlanRequest(values);
    ApiService.mobilizationPlan
      .updateMobilizationPlan(state.id, request)
      .then((response) => {
        ModalHelper.openMessageModalByStatus({
          response,
          callback: this.initState,
        });
      });
  };

  displayAddButton = () => {
    const { props } = this;
    return (
      <ButtonDiv
        className="add-button"
        onClick={this.navigateToAddPage}
        display={userHasRole(42)}
      >
        {props.language.mobilizationClassificationManagement.add}
      </ButtonDiv>
    );
  };

  navigateToAddPage = () => {
    const { props, state } = this;
    const query = createQuery({
      [QueryType.ID]: state.id,
    });
    props.history.push({
      pathname: `${props.location.pathname}/${Path.addMobilizationClassificationManagementPath}`,
      search: query,
    });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container className="mobilization-classification-management">
        <div className="plan-form">
          <SectionTitle
            title={
              props.language.mobilizationClassificationManagement
                .mobilizationPlan
            }
          />
          <Formik
            initialValues={MobilizationPlanForm.initialValue(
              state.formInitialValue,
            )}
            validationSchema={MobilizationPlanForm.validationSchema()}
            onSubmit={this.onSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              submitForm,
              touched,
              values,
              errors,
            }) => (
              <form onSubmit={handleSubmit} className="form" autoComplete="off">
                <div className="inputs">
                  <FormRow>
                    <TextInput
                      title={
                        props.language.addMobilizationPlanManagement.planName
                      }
                      inputType="text"
                      inputName="planName"
                      inputPlaceholder={
                        props.language.addMobilizationPlanManagement
                          .planNameHint
                      }
                      inputValue={values.planName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={MobilizationPlanForm.isFieldRequired(
                        'planName',
                      )}
                      display={!userHasRole(46)}
                    />
                  </FormRow>
                  <div className="button-container">
                    <ButtonDiv
                      className="submit-button"
                      onClick={submitForm}
                      display={userHasRole(46)}
                    >
                      {props.language.addMobilizationPlanManagement.submit}
                    </ButtonDiv>
                    <ButtonDiv
                      className="back-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.addMobilizationPlanManagement.back}
                    </ButtonDiv>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="classification-section">
          <div>
            <PageTitle
              title={
                props.language.mobilizationClassificationManagement
                  .mobilizationClassification
              }
              breadcrumb={false}
              postfixComponent={this.displayAddButton()}
            />
          </div>
          <TableCount count={state.tableCount} />
          <Table data={state.tableData} columns={this.table.getTableHeader()} />
          <Pagination
            tableInstance={this.table}
            currentPage={this.table.currentPage}
            totalPage={this.table.totalPage}
          />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationClassificationManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MobilizationClassificationManagement),
);

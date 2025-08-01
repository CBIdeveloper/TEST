import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../lib/components/Container/Container';
import FormDescription from '../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../lib/components/FormRow/FormRow';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import SectionTitle from '../../../lib/components/SectionTitle/SectionTitle';
import Table from '../../../lib/components/Table/Table';
import TableCount from '../../../lib/components/TableCount/TableCount';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';
import Pagination from '../../../lib/components/Pagination/Pagination';

import ApiService from '../../../utils/api/ApiService';
import BraidingCategoryTable from '../../../utils/tables/systemManagement/BraidingCategoryTable/BraidingCategoryTable';
import MobilizationClassificationForm from '../../../utils/forms/systemManagement/MobilizationClassificationForm';
import MobilizationClassificationRequest from '../../../utils/dataModels/MobilizationClassification/MobilizationClassificationRequest';
import ModalHelper from '../../../utils/helper/ModalHelper';
import Path from '../../../utils/path/path';
import QueryType from '../../../utils/types/QueryType';
import { createQuery } from '../../../utils/parsers/queryParser';
import { userHasRole } from '../../../utils/auth/auth';

import './BraidingCategoryManagement.scss';

class BraidingCategoryManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      tableData: [],
      tableCount: 0,
      formInitialValue: null,
    };
    this.table = new BraidingCategoryTable(
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
    const id = props.query.queryObject.get(QueryType.CLASSIFICATION_ID);
    if (id !== null) {
      this.setId(id);
      this.table.mobilizationClassificationId = id;
      this.table.fetchTableData();
      ApiService.mobilizationClassification
        .readMobilizationClassificationById(id)
        .then((response) => {
          this.setFormInitialValue(response);
        });
    }
  };

  onSubmit = (values) => {
    const { state } = this;
    const request = new MobilizationClassificationRequest({
      ...state.formInitialValue,
      ...values,
    });
    ApiService.mobilizationClassification
      .updateMobilizationClassification(state.id, request)
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
        display={userHasRole(8)}
      >
        {props.language.secondaryAgency.add}
      </ButtonDiv>
    );
  };

  navigateToAddPage = () => {
    const { props, state } = this;
    const query = createQuery({
      [QueryType.CLASSIFICATION_ID]: state.id,
    });
    props.history.push({
      pathname: `${props.location.pathname}/${Path.addBraidingCategoryManagementPath}`,
      search: query,
    });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container className="braiding-category-management">
        <div className="classification-form">
          <SectionTitle
            title={props.language.braidingCategoryManagement.mobilizationPlan}
          />
          <Formik
            initialValues={MobilizationClassificationForm.initialValue(
              state.formInitialValue,
            )}
            validationSchema={MobilizationClassificationForm.validationSchema()}
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
                    <FormDescription
                      leftBorder
                      title={
                        props.language.braidingCategoryManagement
                          .mobilizationPlanName
                      }
                      content={state.formInitialValue.mobilizationPlan}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={
                        props.language.braidingCategoryManagement
                          .mobilizationClassificationName
                      }
                      inputType="text"
                      inputName="classificationName"
                      inputPlaceholder={
                        props.language.addMobilizationClassificationManagement
                          .classificationNameHint
                      }
                      inputValue={values.classificationName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={MobilizationClassificationForm.isFieldRequired(
                        'classificationName',
                      )}
                      display={!userHasRole(43)}
                    />
                  </FormRow>
                  <div className="button-container">
                    <ButtonDiv
                      className="submit-button"
                      onClick={submitForm}
                      display={userHasRole(43)}
                    >
                      {
                        props.language.addMobilizationClassificationManagement
                          .submit
                      }
                    </ButtonDiv>
                    <ButtonDiv
                      className="back-button"
                      onClick={props.history.goBack}
                    >
                      {
                        props.language.addMobilizationClassificationManagement
                          .back
                      }
                    </ButtonDiv>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="braiding-category-section">
          <div className="braiding-category">
            <PageTitle
              title={props.language.braidingCategoryManagement.braidingCategory}
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

BraidingCategoryManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BraidingCategoryManagement),
);

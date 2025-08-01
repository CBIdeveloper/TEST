import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../lib/components/Container/Container';
import FormRow from '../../../lib/components/FormRow/FormRow';
import PageTitle from '../../../lib/components/PageTitle/PageTitle';
import SectionTitle from '../../../lib/components/SectionTitle/SectionTitle';
import Table from '../../../lib/components/Table/Table';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';

import ApiService from '../../../utils/api/ApiService';
import FirstlevelAgencyForm from '../../../utils/forms/systemManagement/FirstlevelAgencyForm';
import FirstlevelAgencyRequest from '../../../utils/dataModels/FirstlevelAgency/FirstlevelAgencyRequest';
import ModalHelper from '../../../utils/helper/ModalHelper';
import Path from '../../../utils/path/path';
import QueryType from '../../../utils/types/QueryType';
import SecondaryAgencyTable from '../../../utils/tables/systemManagement/SecondaryAgencyTable/SecondaryAgencyTable';
import { createQuery } from '../../../utils/parsers/queryParser';
import { userHasRole } from '../../../utils/auth/auth';

import './SecondaryAgency.scss';

class SecondaryAgency extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, tableData: [], formInitialValue: null };
    this.table = new SecondaryAgencyTable(this.setTableData);
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

  setFormInitialValue = (formInitialValue) => {
    this.setState({ formInitialValue });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      this.table.firstLevelId = id;
      this.table.fetchTableData();
      ApiService.firstlevelAgency
        .readFirstlevelAgencyById(id)
        .then((response) => {
          this.setFormInitialValue(response);
        });
    }
  };

  onSubmit = (values) => {
    const { state } = this;
    const request = new FirstlevelAgencyRequest(values);
    ApiService.firstlevelAgency
      .updateFirstlevelAgency(state.id, request)
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
        display={userHasRole(81)}
      >
        {props.language.secondaryAgency.add}
      </ButtonDiv>
    );
  };

  navigateToAddPage = () => {
    const { props, state } = this;
    const query = createQuery({
      [QueryType.ID]: state.id,
    });
    props.history.push({
      pathname: `${props.location.pathname}/${Path.addSecondaryAgencyPath}`,
      search: query,
    });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container className="secondary-agency">
        <div className="first-level-agency-form">
          <SectionTitle
            title={props.language.secondaryAgency.firstLevelAgency}
          />
          <Formik
            initialValues={FirstlevelAgencyForm.initialValue(
              state.formInitialValue,
            )}
            validationSchema={FirstlevelAgencyForm.validationSchema()}
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
                      title={props.language.addFirstLevelAgency.fullName}
                      inputType="text"
                      inputName="fullName"
                      inputPlaceholder={
                        props.language.addFirstLevelAgency.fullNameHint
                      }
                      inputValue={values.fullName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={FirstlevelAgencyForm.isFieldRequired(
                        'fullName',
                      )}
                      display={!userHasRole(30)}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.addFirstLevelAgency.shortName}
                      inputType="text"
                      inputName="shortName"
                      inputPlaceholder={
                        props.language.addFirstLevelAgency.shortNameHint
                      }
                      inputValue={values.shortName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={FirstlevelAgencyForm.isFieldRequired(
                        'shortName',
                      )}
                      display={!userHasRole(30)}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.addFirstLevelAgency.enCode}
                      inputType="text"
                      inputName="enCode"
                      inputPlaceholder={
                        props.language.addFirstLevelAgency.enCodeHint
                      }
                      inputValue={values.enCode}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={FirstlevelAgencyForm.isFieldRequired('enCode')}
                      display={!userHasRole(30)}
                    />
                  </FormRow>
                  <div className="button-container">
                    <ButtonDiv
                      className="submit-button"
                      onClick={submitForm}
                      display={userHasRole(30)}
                    >
                      {props.language.addFirstLevelAgency.submit}
                    </ButtonDiv>
                    <ButtonDiv
                      className="back-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.addFirstLevelAgency.back}
                    </ButtonDiv>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="secondary-agency-section">
          <div className="first-level-agency">
            <PageTitle
              title={props.language.secondaryAgency.secondaryAgency}
              breadcrumb={false}
              postfixComponent={this.displayAddButton()}
            />
          </div>
          <Table data={state.tableData} columns={this.table.getTableHeader()} />
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

SecondaryAgency.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SecondaryAgency),
);

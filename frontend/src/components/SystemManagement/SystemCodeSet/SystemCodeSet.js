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
import CodefileRequest from '../../../utils/dataModels/Codefile/CodefileRequest';
import SystemCodeForm from '../../../utils/forms/systemManagement/SystemCodeForm';
import SystemCodeSetTable from '../../../utils/tables/systemManagement/SystemCodeSetTable/SystemCodeSetTable';
import ModalHelper from '../../../utils/helper/ModalHelper';
import Path from '../../../utils/path/path';
import QueryType from '../../../utils/types/QueryType';
import { createQuery } from '../../../utils/parsers/queryParser';
import { userHasRole } from '../../../utils/auth/auth';

import './SystemCodeSet.scss';

class SystemCodeSet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      tableData: [],
      tableCount: 0,
      formInitialValue: null,
    };
    this.table = new SystemCodeSetTable(this.setTableData, this.setTableCount);
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
      ApiService.codefile.readCodefileById(id).then((response) => {
        this.setFormInitialValue(response);
        this.table.systemCodeId = response.codeId;
        this.table.fetchTableData();
      });
    }
  };

  onSubmit = (values) => {
    const { state } = this;
    const request = new CodefileRequest({
      ...state.formInitialValue,
      ...values,
    });
    ApiService.codefile.updateCodefile(state.id, request).then((response) => {
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
        display={userHasRole(26)}
      >
        {props.language.systemCodeSet.add}
      </ButtonDiv>
    );
  };

  navigateToAddPage = () => {
    const { props, state } = this;
    const query = createQuery({
      [QueryType.ID]: state.id,
    });
    props.history.push({
      pathname: `${props.location.pathname}/${Path.addSystemCodeSetPath}`,
      search: query,
    });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container className="system-code-set">
        <div className="system-code-form">
          <SectionTitle title={props.language.systemCodeSet.systemCode} />
          <Formik
            initialValues={SystemCodeForm.initialValue(state.formInitialValue)}
            validationSchema={SystemCodeForm.validationSchema()}
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
                      title={props.language.addSystemCode.name}
                      inputType="text"
                      inputName="name"
                      inputPlaceholder={props.language.addSystemCode.nameHint}
                      inputValue={values.name}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemCodeForm.isFieldRequired('name')}
                      display={!userHasRole(27)}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.addSystemCode.heading}
                      inputType="text"
                      inputName="heading"
                      inputPlaceholder={
                        props.language.addSystemCode.headingHint
                      }
                      inputValue={values.heading}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemCodeForm.isFieldRequired('heading')}
                      display={!userHasRole(27)}
                    />
                  </FormRow>
                  <ButtonDiv
                    className="submit-button"
                    onClick={submitForm}
                    display={userHasRole(27)}
                  >
                    {props.language.addSystemCode.submit}
                  </ButtonDiv>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="classification-section">
          <div>
            <PageTitle
              title={props.language.systemCodeSet.systemCodeSet}
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

SystemCodeSet.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SystemCodeSet),
);

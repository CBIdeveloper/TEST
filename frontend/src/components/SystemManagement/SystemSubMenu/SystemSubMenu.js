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
import MultipleSelectInput from '../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';

import ApiService from '../../../utils/api/ApiService';
import BooleanType from '../../../utils/constants/BooleanType';
import SystemMenuForm from '../../../utils/forms/systemManagement/SystemMenuForm';
import SystemSubMenuTable from '../../../utils/tables/systemManagement/SystemSubMenuTable/SystemSubMenuTable';
import MenuRequest from '../../../utils/dataModels/Menu/MenuRequest';
import ModalHelper from '../../../utils/helper/ModalHelper';
import Path from '../../../utils/path/path';
import QueryType from '../../../utils/types/QueryType';
import { createQuery } from '../../../utils/parsers/queryParser';
import { userHasRole } from '../../../utils/auth/auth';

import './SystemSubMenu.scss';

class SystemSubMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      tableData: [],
      tableCount: 0,
      formInitialValue: null,
    };
    this.table = new SystemSubMenuTable(this.setTableData, this.setTableCount);
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
      this.table.parentMenuId = id;
      this.table.fetchTableData();
      ApiService.menu.readMenuById(id).then((response) => {
        this.setFormInitialValue(response);
      });
    }
  };

  onSubmit = (values) => {
    const { state } = this;
    const request = new MenuRequest({
      ...state.formInitialValue,
      ...values,
    });
    ApiService.menu.updateMenu(state.id, request).then((response) => {
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
        display={userHasRole(39)}
      >
        {props.language.systemSubMenu.add}
      </ButtonDiv>
    );
  };

  navigateToAddPage = () => {
    const { props, state } = this;
    const query = createQuery({
      [QueryType.ID]: state.id,
    });
    props.history.push({
      pathname: `${props.location.pathname}/${Path.addSystemSubMenuPath}`,
      search: query,
    });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container className="system-sub-menu">
        <div className="menu-section">
          <SectionTitle title={props.language.systemSubMenu.systemMenu} />
          <Formik
            initialValues={SystemMenuForm.initialValue(state.formInitialValue)}
            validationSchema={SystemMenuForm.validationSchema()}
            onSubmit={this.onSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              submitForm,
              touched,
              values,
              errors,
            }) => (
              <form onSubmit={handleSubmit} className="form" autoComplete="off">
                <div className="inputs">
                  <FormRow>
                    <TextInput
                      title={props.language.addSystemMenu.menuName}
                      inputType="text"
                      inputName="menuName"
                      inputPlaceholder={
                        props.language.addSystemMenu.menuNameHint
                      }
                      inputValue={values.menuName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('menuName')}
                      display={!userHasRole(40)}
                    />
                    <TextInput
                      title={props.language.addSystemMenu.sequenceNumber}
                      inputType="number"
                      inputName="sequenceNumber"
                      inputPlaceholder={
                        props.language.addSystemMenu.sequenceNumberHint
                      }
                      inputValue={values.sequenceNumber}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired(
                        'sequenceNumber',
                      )}
                      display={!userHasRole(40)}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.addSystemMenu.url}
                      inputType="text"
                      inputName="url"
                      inputPlaceholder={props.language.addSystemMenu.urlHint}
                      inputValue={values.url}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('url')}
                      display={!userHasRole(40)}
                    />
                    <TextInput
                      title={props.language.addSystemMenu.controller}
                      inputType="text"
                      inputName="controller"
                      inputPlaceholder={
                        props.language.addSystemMenu.controllerHint
                      }
                      inputValue={values.controller}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('controller')}
                      display={!userHasRole(40)}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.addSystemMenu.action}
                      inputType="text"
                      inputName="action"
                      inputPlaceholder={props.language.addSystemMenu.actionHint}
                      inputValue={values.action}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('action')}
                      display={!userHasRole(40)}
                    />
                    <TextInput
                      title={props.language.addSystemMenu.param}
                      inputType="text"
                      inputName="param"
                      inputPlaceholder={props.language.addSystemMenu.paramHint}
                      inputValue={values.param}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('param')}
                      display={!userHasRole(40)}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleSelectInput
                      singleSelection
                      horizontal
                      title={props.language.addSystemMenu.isVisible}
                      inputName="isVisible"
                      inputValue={values.isVisible}
                      setFieldValue={setFieldValue}
                      options={BooleanType}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('isVisible')}
                      display={!userHasRole(40)}
                    />
                    <MultipleSelectInput
                      singleSelection
                      horizontal
                      title={props.language.addSystemMenu.isCreatable}
                      inputName="isCreatable"
                      inputValue={values.isCreatable}
                      setFieldValue={setFieldValue}
                      options={BooleanType}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('isCreatable')}
                      display={!userHasRole(40)}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleSelectInput
                      singleSelection
                      horizontal
                      title={props.language.addSystemMenu.isUpdatable}
                      inputName="isUpdatable"
                      inputValue={values.isUpdatable}
                      setFieldValue={setFieldValue}
                      options={BooleanType}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('isUpdatable')}
                      display={!userHasRole(40)}
                    />
                    <MultipleSelectInput
                      singleSelection
                      horizontal
                      title={props.language.addSystemMenu.isDeletable}
                      inputName="isDeletable"
                      inputValue={values.isDeletable}
                      setFieldValue={setFieldValue}
                      options={BooleanType}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('isDeletable')}
                      display={!userHasRole(40)}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleSelectInput
                      singleSelection
                      horizontal
                      title={props.language.addSystemMenu.isAuditable}
                      inputName="isAuditable"
                      inputValue={values.isAuditable}
                      setFieldValue={setFieldValue}
                      options={BooleanType}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('isAuditable')}
                      display={!userHasRole(40)}
                    />
                    <MultipleSelectInput
                      singleSelection
                      horizontal
                      title={props.language.addSystemMenu.isExportable}
                      inputName="isExportable"
                      inputValue={values.isExportable}
                      setFieldValue={setFieldValue}
                      options={BooleanType}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('isExportable')}
                      display={!userHasRole(40)}
                    />
                  </FormRow>
                  <FormRow>
                    <MultipleSelectInput
                      singleSelection
                      horizontal
                      title={props.language.addSystemMenu.isExisted}
                      inputName="isExisted"
                      inputValue={values.isExisted}
                      setFieldValue={setFieldValue}
                      options={BooleanType}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('isExisted')}
                      display={!userHasRole(40)}
                    />
                  </FormRow>
                  <ButtonDiv
                    className="submit-button"
                    onClick={submitForm}
                    display={userHasRole(40)}
                  >
                    {props.language.addSystemMenu.submit}
                  </ButtonDiv>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="sub-menu-section">
          <div>
            <PageTitle
              title={props.language.systemSubMenu.systemSubMenu}
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

SystemSubMenu.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SystemSubMenu),
);

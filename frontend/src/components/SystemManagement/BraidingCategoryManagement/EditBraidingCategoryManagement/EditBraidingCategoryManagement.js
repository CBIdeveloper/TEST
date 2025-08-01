import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';
import MultipleSelectInput from '../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';

import ApiService from '../../../../utils/api/ApiService';
import BraidingCategoryType from '../../../../utils/constants/BraidingCategoryType';
import BraidingCategoryForm from '../../../../utils/forms/systemManagement/BraidingCategoryForm';
import BraidingCategoryRequest from '../../../../utils/dataModels/BraidingCategory/BraidingCategoryRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './EditBraidingCategoryManagement.scss';
import SelectInput from "../../../../lib/components/inputs/SelectInput/SelectInput";
import monthsInt from "../../../../utils/constants/MonthsInt";

class EditBraidingCategoryManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, formInitialValue: null, planName: '' };
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

  setFormInitialValue = (formInitialValue) => {
    this.setState({ formInitialValue });
  };

  setPlanName = (planName) => {
    this.setState({ planName });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.CATEGORY_ID);
    if (id !== null) {
      this.setId(id);
      ApiService.braidingCategory
        .readBraidingCategoryById(id)
        .then((response) => {
          this.setFormInitialValue(response);

          ApiService.mobilizationPlan
            .readMobilizationPlanById(response.mobilizationPlanId)
            .then((planResponse) => {
              this.setPlanName(planResponse.planName);
            });
        });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new BraidingCategoryRequest({
      ...state.formInitialValue,
      ...values,
    });
    ApiService.braidingCategory
      .updateBraidingCategory(state.id, request)
      .then((response) => {
        ModalHelper.openMessageModalByStatus({
          response,
          callback: props.history.goBack,
        });
      });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container className="edit-braiding-category-management">
        <SectionTitle
          title={
            props.language.systemManagement.subMenus
              .editBraidingCategoryManagement
          }
        />
        <Formik
          initialValues={BraidingCategoryForm.initialValue(
            state.formInitialValue,
          )}
          validationSchema={BraidingCategoryForm.validationSchema()}
          onSubmit={this.onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            resetForm,
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
                      props.language.editBraidingCategoryManagement
                        .mobilizationPlan
                    }
                    content={state.planName}
                  />
                </FormRow>
                <FormRow>
                  <FormDescription
                    leftBorder
                    title={
                      props.language.editBraidingCategoryManagement
                        .mobilizationClassification
                    }
                    content={state.formInitialValue.mobilizationClassification}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    title={
                      props.language.editBraidingCategoryManagement.fullName
                    }
                    inputType="text"
                    inputName="fullName"
                    inputPlaceholder={
                      props.language.editBraidingCategoryManagement.fullNameHint
                    }
                    inputValue={values.fullName}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={BraidingCategoryForm.isFieldRequired('fullName')}
                  />
                </FormRow>
                <FormRow>
                  <MultipleSelectInput
                    singleSelection
                    horizontal
                    title={
                      props.language.editBraidingCategoryManagement.categoryType
                    }
                    inputName="categoryType"
                    inputValue={values.categoryType}
                    setFieldValue={setFieldValue}
                    options={BraidingCategoryType}
                    touched={touched}
                    errors={errors}
                    required={BraidingCategoryForm.isFieldRequired(
                      'categoryType',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                      title={
                        props.language.editBraidingCategoryManagement.projectManagementNumber
                      }
                      inputType="text"
                      inputName="projectManagementNumber"
                      inputPlaceholder={
                        props.language.editBraidingCategoryManagement
                            .projectManagementNumberHint
                      }
                      inputValue={values.projectManagementNumber}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                      inputType="text"
                      title={props.language.addBraidingCategoryManagement.updateCycle}
                      inputName="updateCycle"
                      inputValue={values.updateCycle}
                      setFieldValue={setFieldValue}
                      options={monthsInt}
                      trailingInput={<span className="monthUnit">個月</span>}
                      touched={touched}
                      errors={errors}
                  />
                </FormRow>
                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.editBraidingCategoryManagement.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.editBraidingCategoryManagement.clear}
                  </ButtonDiv>
                  <ButtonDiv className="save-button" onClick={submitForm}>
                    {props.language.editBraidingCategoryManagement.save}
                  </ButtonDiv>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

EditBraidingCategoryManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditBraidingCategoryManagement),
);

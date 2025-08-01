import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../../../../lib/components/inputs/DateInput/DateInput';
import FormDescription from '../../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import FileInput from '../../../../../lib/components/inputs/FileInput/FileInput';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import SelectInput from '../../../../../lib/components/inputs/SelectInput/SelectInput';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../../store/loading/slice';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationPlanForm from '../../../../../utils/forms/retrievalService/planDownload/MobilizationPlanForm';
import ModalHelper from '../../../../../utils/helper/ModalHelper';
import PlanMobilizationPlanRequest from '../../../../../utils/dataModels/PlanMobilizationPlan/PlanMobilizationPlanRequest';
import QueryType from '../../../../../utils/types/QueryType';

import './EditMobilizationPlan.scss';

class EditMobilizationPlan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      formInitialValues: null,
      agencyList: [],
      planList: [],
    };
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

  setFormInitialValues = (formInitialValues) => {
    this.setState({ formInitialValues });
  };

  setAgencyList = (agencyList) => {
    this.setState({ agencyList });
  };

  setPlanList = (planList) => {
    this.setState({ planList });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.DETAIL_ID);
    this.setId(id);
    if (id !== null) {
      ApiService.planMobilizationPlan
        .readPlanMobilizationPlanById(id)
        .then((response) => {
          this.setFormInitialValues(response);
        });
      ApiService.mobilizationPlan.readMobilizationPlan().then((response) => {
        const planList = response.map((item) => ({
          text: item.planName,
          value: item.id,
        }));
        this.setPlanList(planList);
      });
      ApiService.firstlevelAgency.readFirstlevelAgency().then((response) => {
        const agencyList = response.map((item) => ({
          text: item.shortName,
          value: item.id,
        }));
        this.setAgencyList(agencyList);
      });
    }
  };

  handleFileOnClicked = () => {
    const { state } = this;
    ApiService.planMobilizationPlan.downloadMobilizationPlan(state.id);
  };

  onSubmit = (values) => {
    const { props, state } = this;
    props.setLoading(true);
    if (values.file !== '') {
      const request = new PlanMobilizationPlanRequest(values).getUpdateData();
      ApiService.planMobilizationPlan
        .updatePlanMobilizationPlan(state.id, request)
        .then((response) => {
          ModalHelper.openMessageModalByStatus({
            response,
            callback: props.history.goBack,
          });
          props.setLoading(false);
        })
        .catch(() => {
          props.setLoading(false);
        });
    } else {
      const request = new PlanMobilizationPlanRequest(
        values,
      ).getUpdateDataWithoutFile();
      ApiService.planMobilizationPlan
        .updatePlanMobilizationPlanWithoutFile(state.id, request)
        .then((response) => {
          ModalHelper.openMessageModalByStatus({
            response,
            callback: props.history.goBack,
          });
          props.setLoading(false);
        })
        .catch(() => {
          props.setLoading(false);
        });
    }
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValues === null) return '';

    return (
      <div className="edit-mobilization-plan">
        <SectionTitle
          title={props.language.retrievalService.subMenus.editMobilizationPlan}
        />
        <Formik
          initialValues={MobilizationPlanForm.initialValue(
            state.formInitialValues,
          )}
          validationSchema={MobilizationPlanForm.validationSchema()}
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
                  <TextInput
                    full
                    title={
                      props.language.editMobilizationPlan
                        .mobilizationPlanSubject
                    }
                    inputType="text"
                    inputName="mobilizationPlanSubject"
                    inputPlaceholder={
                      props.language.editMobilizationPlan
                        .mobilizationPlanSubjectHint
                    }
                    inputValue={values.mobilizationPlanSubject}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={MobilizationPlanForm.isFieldRequired(
                      'mobilizationPlanSubject',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.editMobilizationPlan.mobilizationPlanId
                    }
                    inputName="mobilizationPlanId"
                    inputPlaceholder={
                      props.language.editMobilizationPlan.mobilizationPlanIdHint
                    }
                    inputValue={values.mobilizationPlanId}
                    setFieldValue={setFieldValue}
                    options={state.planList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationPlanForm.isFieldRequired(
                      'mobilizationPlanId',
                    )}
                    disable
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.editMobilizationPlan
                        .releaseFirstlevelAgencyId
                    }
                    inputName="releaseFirstlevelAgencyId"
                    inputPlaceholder={
                      props.language.editMobilizationPlan
                        .releaseFirstlevelAgencyIdHint
                    }
                    inputValue={values.releaseFirstlevelAgencyId}
                    setFieldValue={setFieldValue}
                    options={state.agencyList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationPlanForm.isFieldRequired(
                      'releaseFirstlevelAgencyId',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <DateInput
                    title={props.language.editMobilizationPlan.releaseDate}
                    inputName="releaseDate"
                    inputPlaceholder={
                      props.language.editMobilizationPlan.releaseDateHint
                    }
                    inputValue={values.releaseDate}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    required={MobilizationPlanForm.isFieldRequired(
                      'releaseDate',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <FileInput
                    title={props.language.editMobilizationPlan.file}
                    inputName="file"
                    inputPlaceholder={
                      props.language.editMobilizationPlan.fileHint
                    }
                    inputValue={values.file}
                    setFieldValue={setFieldValue}
                    description={
                      props.language.editMobilizationPlan.fileDescription
                    }
                    acceptFileExtension={['.pdf']}
                    touched={touched}
                    errors={errors}
                  />
                </FormRow>
                <FormRow>
                  <FormDescription
                    leftBorder
                    title={props.language.editMobilizationPlan.currentFile}
                    content={
                      <ButtonDiv
                        className="file-text"
                        onClick={this.handleFileOnClicked}
                      >
                        {state.formInitialValues.uploadedFileName}
                      </ButtonDiv>
                    }
                  />
                </FormRow>

                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.editMobilizationPlan.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.editMobilizationPlan.clear}
                  </ButtonDiv>
                  <ButtonDiv className="save-button" onClick={submitForm}>
                    {props.language.editMobilizationPlan.save}
                  </ButtonDiv>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

EditMobilizationPlan.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditMobilizationPlan),
);

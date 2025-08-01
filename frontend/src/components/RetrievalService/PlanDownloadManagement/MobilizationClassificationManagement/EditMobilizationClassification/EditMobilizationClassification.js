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
import MobilizationClassificationForm from '../../../../../utils/forms/retrievalService/planDownload/MobilizationClassificationForm';
import ModalHelper from '../../../../../utils/helper/ModalHelper';
import PlanMobilizationClassificationRequest from '../../../../../utils/dataModels/PlanMobilizationClassification/PlanMobilizationClassificationRequest';
import QueryType from '../../../../../utils/types/QueryType';

import './EditMobilizationClassification.scss';

class EditMobilizationClassification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      formInitialValues: null,
      agencyList: [],
      classificationList: [],
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

  setClassificationList = (classificationList) => {
    this.setState({ classificationList });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.CLASSIFICATION_ID);
    this.setId(id);
    if (id !== null) {
      ApiService.planMobilizationClassification
        .readPlanMobilizationClassificationById(id)
        .then((response) => {
          this.setFormInitialValues(response);
        });
      ApiService.mobilizationClassification
        .readMobilizationClassification()
        .then((response) => {
          const classificationList = response.map((item) => ({
            text: item.classificationName,
            value: item.id,
          }));
          this.setClassificationList(classificationList);
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
    ApiService.planMobilizationClassification.downloadMobilizationClassification(
      state.id,
    );
  };

  onSubmit = (values) => {
    const { props, state } = this;
    props.setLoading(true);
    if (values.file !== '') {
      const request = new PlanMobilizationClassificationRequest(
        values,
      ).getUpdateData();
      ApiService.planMobilizationClassification
        .updatePlanMobilizationClassification(state.id, request)
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
      const request = new PlanMobilizationClassificationRequest(
        values,
      ).getUpdateDataWithoutFile();
      ApiService.planMobilizationClassification
        .updatePlanMobilizationClassificationWithoutFile(state.id, request)
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
      <div className="edit-mobilization-classification">
        <SectionTitle
          title={
            props.language.retrievalService.subMenus
              .editMobilizationClassification
          }
        />
        <Formik
          initialValues={MobilizationClassificationForm.initialValue(
            state.formInitialValues,
          )}
          validationSchema={MobilizationClassificationForm.validationSchema()}
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
                      props.language.editMobilizationClassification
                        .mobilizationClassificationSubject
                    }
                    inputType="text"
                    inputName="mobilizationClassificationSubject"
                    inputPlaceholder={
                      props.language.editMobilizationClassification
                        .mobilizationClassificationSubjectHint
                    }
                    inputValue={values.mobilizationClassificationSubject}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={MobilizationClassificationForm.isFieldRequired(
                      'mobilizationClassificationSubject',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.editMobilizationClassification
                        .mobilizationClassificationId
                    }
                    inputName="mobilizationClassificationId"
                    inputPlaceholder={
                      props.language.editMobilizationClassification
                        .mobilizationClassificationIdHint
                    }
                    inputValue={values.mobilizationClassificationId}
                    setFieldValue={setFieldValue}
                    options={state.classificationList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationClassificationForm.isFieldRequired(
                      'mobilizationClassificationId',
                    )}
                    disable
                  />
                </FormRow>
                <FormRow>
                  <SelectInput
                    title={
                      props.language.editMobilizationClassification
                        .releaseFirstlevelAgencyId
                    }
                    inputName="releaseFirstlevelAgencyId"
                    inputPlaceholder={
                      props.language.editMobilizationClassification
                        .releaseFirstlevelAgencyIdHint
                    }
                    inputValue={values.releaseFirstlevelAgencyId}
                    setFieldValue={setFieldValue}
                    options={state.agencyList}
                    touched={touched}
                    errors={errors}
                    required={MobilizationClassificationForm.isFieldRequired(
                      'releaseFirstlevelAgencyId',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <DateInput
                    title={
                      props.language.editMobilizationClassification.releaseDate
                    }
                    inputName="releaseDate"
                    inputPlaceholder={
                      props.language.editMobilizationClassification
                        .releaseDateHint
                    }
                    inputValue={values.releaseDate}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    required={MobilizationClassificationForm.isFieldRequired(
                      'releaseDate',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <FileInput
                    title={props.language.editMobilizationClassification.file}
                    inputName="file"
                    inputPlaceholder={
                      props.language.editMobilizationClassification.fileHint
                    }
                    inputValue={values.file}
                    setFieldValue={setFieldValue}
                    description={
                      props.language.editMobilizationClassification
                        .fileDescription
                    }
                    acceptFileExtension={['.pdf']}
                    touched={touched}
                    errors={errors}
                  />
                </FormRow>
                <FormRow>
                  <FormDescription
                    leftBorder
                    title={
                      props.language.editMobilizationClassification.currentFile
                    }
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
                    {props.language.editMobilizationClassification.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.editMobilizationClassification.clear}
                  </ButtonDiv>
                  <ButtonDiv className="save-button" onClick={submitForm}>
                    {props.language.editMobilizationClassification.save}
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

EditMobilizationClassification.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditMobilizationClassification),
);

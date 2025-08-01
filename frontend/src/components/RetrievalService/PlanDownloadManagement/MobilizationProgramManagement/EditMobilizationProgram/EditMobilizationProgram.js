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
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../../store/loading/slice';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationProgramForm from '../../../../../utils/forms/retrievalService/planDownload/MobilizationProgramForm';
import ModalHelper from '../../../../../utils/helper/ModalHelper';
import PlanMobilizationProgramRequest from '../../../../../utils/dataModels/PlanMobilizationProgram/PlanMobilizationProgramRequest';
import QueryType from '../../../../../utils/types/QueryType';

import './EditMobilizationProgram.scss';

class EditMobilizationProgram extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, formInitialValues: null };
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

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    this.setId(id);
    if (id !== null) {
      ApiService.planMobilizationProgram
        .readPlanMobilizationProgramById(id)
        .then((response) => {
          this.setFormInitialValues(response);
        });
    }
  };

  handleFileOnClicked = () => {
    const { state } = this;
    ApiService.planMobilizationProgram.downloadMobilizationProgram(state.id);
  };

  onSubmit = (values) => {
    const { props, state } = this;
    props.setLoading(true);
    if (values.file !== '') {
      const request = new PlanMobilizationProgramRequest(
        values,
      ).getUpdateData();
      ApiService.planMobilizationProgram
        .updatePlanMobilizationProgram(state.id, request)
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
      const request = new PlanMobilizationProgramRequest(
        values,
      ).getUpdateDataWithoutFile();
      ApiService.planMobilizationProgram
        .updatePlanMobilizationProgramWithoutFile(state.id, request)
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
      <div className="edit-mobilization-program">
        <SectionTitle
          title={
            props.language.retrievalService.subMenus.editMobilizationProgram
          }
        />
        <Formik
          initialValues={MobilizationProgramForm.initialValue(
            state.formInitialValues,
          )}
          validationSchema={MobilizationProgramForm.validationSchema()}
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
                      props.language.editMobilizationProgram
                        .mobilizationProgramSubject
                    }
                    inputType="text"
                    inputName="mobilizationProgramSubject"
                    inputPlaceholder={
                      props.language.editMobilizationProgram
                        .mobilizationProgramSubjectHint
                    }
                    inputValue={values.mobilizationProgramSubject}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={MobilizationProgramForm.isFieldRequired(
                      'mobilizationProgramSubject',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    title={
                      props.language.editMobilizationProgram
                        .releaseFirstlevelAgencyId
                    }
                    inputName="releaseFirstlevelAgencyId"
                    inputPlaceholder={
                      props.language.editMobilizationProgram
                        .releaseFirstlevelAgencyIdHint
                    }
                    inputValue={
                      props.language.editMobilizationProgram.executiveYuan
                    }
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required
                    display
                  />
                </FormRow>
                <FormRow>
                  <DateInput
                    title={props.language.editMobilizationProgram.releaseDate}
                    inputName="releaseDate"
                    inputPlaceholder={
                      props.language.editMobilizationProgram.releaseDateHint
                    }
                    inputValue={values.releaseDate}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    required={MobilizationProgramForm.isFieldRequired(
                      'releaseDate',
                    )}
                  />
                </FormRow>
                <FormRow>
                  <FileInput
                    title={props.language.editMobilizationProgram.file}
                    inputName="file"
                    inputPlaceholder={
                      props.language.editMobilizationProgram.fileHint
                    }
                    inputValue={values.file}
                    setFieldValue={setFieldValue}
                    description={
                      props.language.editMobilizationProgram.fileDescription
                    }
                    acceptFileExtension={['.pdf']}
                    touched={touched}
                    errors={errors}
                  />
                </FormRow>
                <FormRow>
                  <FormDescription
                    leftBorder
                    title={props.language.editMobilizationProgram.currentFile}
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
                    {props.language.editMobilizationProgram.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.editMobilizationProgram.clear}
                  </ButtonDiv>
                  <ButtonDiv className="save-button" onClick={submitForm}>
                    {props.language.editMobilizationProgram.save}
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

EditMobilizationProgram.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditMobilizationProgram),
);

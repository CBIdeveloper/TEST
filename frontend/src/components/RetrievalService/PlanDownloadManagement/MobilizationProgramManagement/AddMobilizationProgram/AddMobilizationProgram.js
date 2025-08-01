import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import DateInput from '../../../../../lib/components/inputs/DateInput/DateInput';
import FormRow from '../../../../../lib/components/FormRow/FormRow';
import FileInput from '../../../../../lib/components/inputs/FileInput/FileInput';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../../store/loading/slice';

import ApiService from '../../../../../utils/api/ApiService';
import MobilizationProgramForm from '../../../../../utils/forms/retrievalService/planDownload/MobilizationProgramForm';
import ModalHelper from '../../../../../utils/helper/ModalHelper';
import PlanMobilizationProgramRequest from '../../../../../utils/dataModels/PlanMobilizationProgram/PlanMobilizationProgramRequest';
import { getFirstlevelAgencyId } from '../../../../../utils/auth/auth';

import './AddMobilizationProgram.scss';

class AddMobilizationProgram extends React.PureComponent {
  onSubmit = (values) => {
    const { props } = this;
    props.setLoading(true);
    const request = new PlanMobilizationProgramRequest(values).getCreateData();
    ApiService.planMobilizationProgram
      .createPlanMobilizationProgram(request)
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
  };

  render() {
    const { props } = this;

    return (
      <div className="add-mobilization-program">
        <SectionTitle
          title={
            props.language.retrievalService.subMenus.addMobilizationProgram
          }
        />
        <Formik
          initialValues={MobilizationProgramForm.initialValue({
            firstlevelAgencyId: getFirstlevelAgencyId(),
            isCreate: true,
          })}
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
                      props.language.addMobilizationProgram
                        .mobilizationProgramSubject
                    }
                    inputType="text"
                    inputName="mobilizationProgramSubject"
                    inputPlaceholder={
                      props.language.addMobilizationProgram
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
                      props.language.addMobilizationProgram
                        .releaseFirstlevelAgencyId
                    }
                    inputName="releaseFirstlevelAgencyId"
                    inputPlaceholder={
                      props.language.addMobilizationProgram
                        .releaseFirstlevelAgencyIdHint
                    }
                    inputValue={
                      props.language.addMobilizationProgram.executiveYuan
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
                    title={props.language.addMobilizationProgram.releaseDate}
                    inputName="releaseDate"
                    inputPlaceholder={
                      props.language.addMobilizationProgram.releaseDateHint
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
                    title={props.language.addMobilizationProgram.file}
                    inputName="file"
                    inputPlaceholder={
                      props.language.addMobilizationProgram.fileHint
                    }
                    inputValue={values.file}
                    setFieldValue={setFieldValue}
                    description={
                      props.language.addMobilizationProgram.fileDescription
                    }
                    acceptFileExtension={['.pdf']}
                    touched={touched}
                    errors={errors}
                    required
                  />
                </FormRow>

                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.addMobilizationProgram.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.addMobilizationProgram.clear}
                  </ButtonDiv>
                  <ButtonDiv className="submit-button" onClick={submitForm}>
                    {props.language.addMobilizationProgram.submit}
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
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

AddMobilizationProgram.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddMobilizationProgram),
);

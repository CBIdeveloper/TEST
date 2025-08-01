import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';

import ApiService from '../../../../utils/api/ApiService';
import MobilizationPlanForm from '../../../../utils/forms/systemManagement/MobilizationPlanForm';
import MobilizationPlanRequest from '../../../../utils/dataModels/MobilizationPlan/MobilizationPlanRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import './AddMobilizationPlanManagement.scss';

class AddMobilizationPlanManagement extends React.PureComponent {
  onSubmit = (values) => {
    const { props } = this;
    const request = new MobilizationPlanRequest(values);
    ApiService.mobilizationPlan
      .createMobilizationPlan(request)
      .then((response) => {
        ModalHelper.openMessageModalByStatus({
          response,
          callback: props.history.goBack,
        });
      });
  };

  render() {
    const { props } = this;

    return (
      <Container>
        <div className="add-mobilization-plan-management">
          <SectionTitle
            title={
              props.language.systemManagement.subMenus
                .addMobilizationPlanManagement
            }
          />
          <Formik
            initialValues={MobilizationPlanForm.initialValue({})}
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
                    />
                  </FormRow>
                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.addMobilizationPlanManagement.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addMobilizationPlanManagement.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addMobilizationPlanManagement.submit}
                    </ButtonDiv>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMobilizationPlanManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddMobilizationPlanManagement),
);

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
import FirstlevelAgencyForm from '../../../../utils/forms/systemManagement/FirstlevelAgencyForm';
import FirstlevelAgencyRequest from '../../../../utils/dataModels/FirstlevelAgency/FirstlevelAgencyRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import './AddFirstLevelAgency.scss';

class AddFirstLevelAgency extends React.PureComponent {
  onSubmit = (values) => {
    const { props } = this;
    const request = new FirstlevelAgencyRequest(values);
    ApiService.firstlevelAgency
      .createFirstlevelAgency(request)
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
        <div className="add-first-level-agency">
          <SectionTitle
            title={props.language.systemManagement.subMenus.addFirstLevelAgency}
          />
          <Formik
            initialValues={FirstlevelAgencyForm.initialValue({})}
            validationSchema={FirstlevelAgencyForm.validationSchema()}
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
                    />
                  </FormRow>
                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.addFirstLevelAgency.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addFirstLevelAgency.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addFirstLevelAgency.submit}
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

AddFirstLevelAgency.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddFirstLevelAgency),
);

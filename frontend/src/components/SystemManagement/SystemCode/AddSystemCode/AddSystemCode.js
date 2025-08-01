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
import CodefileRequest from '../../../../utils/dataModels/Codefile/CodefileRequest';
import SystemCodeForm from '../../../../utils/forms/systemManagement/SystemCodeForm';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import './AddSystemCode.scss';

class AddSystemCode extends React.PureComponent {
  onSubmit = (values) => {
    const { props } = this;
    const request = new CodefileRequest({
      ...values,
      codeId: values.codeId.length >= 3 ? values.codeId.padStart(3, '0') : values.codeId,
      parentCodeId: '0',
      sequenceNumber: 0,
      isExisted: true,
    });
    ApiService.codefile.createCodefile(request).then((response) => {
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
        <div className="add-system-code">
          <SectionTitle
            title={props.language.systemManagement.subMenus.addSystemCode}
          />
          <Formik
            initialValues={SystemCodeForm.initialValue({})}
            validationSchema={SystemCodeForm.validationSchema()}
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
                      title={props.language.addSystemCode.codeId}
                      inputType="number"
                      inputName="codeId"
                      inputPlaceholder={props.language.addSystemCode.codeIdHint}
                      inputValue={values.codeId}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemCodeForm.isFieldRequired('codeId')}
                    />
                  </FormRow>
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
                    />
                  </FormRow>
                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.addSystemCode.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addSystemCode.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addSystemCode.submit}
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

AddSystemCode.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddSystemCode),
);

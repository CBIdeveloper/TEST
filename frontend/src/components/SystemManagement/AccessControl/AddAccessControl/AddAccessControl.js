import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import AccessControlListItem from '../AccessControlListItem/AccessControlListItem';
import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';

import AccessControlConfig from '../../../../utils/config/accessControl/accessControlConfig';
import ApiService from '../../../../utils/api/ApiService';
import RoleMainRequest from '../../../../utils/dataModels/RoleMain/RoleMainRequest';
import AccessControlForm from '../../../../utils/forms/systemManagement/AccessControlForm';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import './AddAccessControl.scss';

class AddAccessControl extends React.PureComponent {
  onSubmit = (values) => {
    const { props } = this;
    const request = new RoleMainRequest(values);
    ApiService.roleMain.createRoleMain(request).then((response) => {
      ModalHelper.openMessageModalByStatus({
        response,
        callback: props.history.goBack,
      });
    });
  };

  displayAccessControl = ({ values, setFieldValue }) =>
    AccessControlConfig.map((item) => (
      <AccessControlListItem
        configItem={item}
        values={values}
        setFieldValue={setFieldValue}
      />
    ));

  render() {
    const { props } = this;

    return (
      <Container>
        <div className="add-access-control">
          <SectionTitle
            title={props.language.systemManagement.subMenus.addAccessControl}
          />
          <Formik
            initialValues={AccessControlForm.initialValue({
              isExisted: true,
            })}
            validationSchema={AccessControlForm.validationSchema()}
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
                      title={props.language.addAccessControl.roleName}
                      inputType="text"
                      inputName="roleName"
                      inputPlaceholder={
                        props.language.addAccessControl.roleNameHint
                      }
                      inputValue={values.roleName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={AccessControlForm.isFieldRequired('roleName')}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      full
                      title={props.language.addAccessControl.roleMemo}
                      inputType="textarea"
                      inputName="roleMemo"
                      inputPlaceholder={
                        props.language.addAccessControl.roleMemoHint
                      }
                      inputValue={values.roleMemo}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={AccessControlForm.isFieldRequired('roleMemo')}
                    />
                  </FormRow>

                  <div className="access-control-table">
                    {this.displayAccessControl({ values, setFieldValue })}
                  </div>

                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.addAccessControl.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addAccessControl.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addAccessControl.submit}
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

AddAccessControl.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddAccessControl),
);

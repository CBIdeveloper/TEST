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
import MultipleSelectInput from '../../../../lib/components/inputs/MultipleSelectInput/MultipleSelectInput';

import ApiService from '../../../../utils/api/ApiService';
import BooleanType from '../../../../utils/constants/BooleanType';
import SystemMenuForm from '../../../../utils/forms/systemManagement/SystemMenuForm';
import MenuRequest from '../../../../utils/dataModels/Menu/MenuRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';

import './AddSystemMenu.scss';

class AddSystemMenu extends React.PureComponent {
  onSubmit = (values) => {
    const { props } = this;
    const request = new MenuRequest({
      ...values,
      menuType: '0',
      parentMenuId: null,
    });
    ApiService.menu.createMenu(request).then((response) => {
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
        <div className="add-system-menu">
          <SectionTitle
            title={props.language.systemManagement.subMenus.addSystemMenu}
          />
          <Formik
            initialValues={SystemMenuForm.initialValue({
              isVisible: true,
              isCreatable: true,
              isUpdatable: true,
              isDeletable: true,
              isAuditable: true,
              isExportable: true,
              isExisted: true,
            })}
            validationSchema={SystemMenuForm.validationSchema()}
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
                    />
                  </FormRow>
                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.addSystemMenu.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addSystemMenu.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addSystemMenu.submit}
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

AddSystemMenu.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddSystemMenu),
);

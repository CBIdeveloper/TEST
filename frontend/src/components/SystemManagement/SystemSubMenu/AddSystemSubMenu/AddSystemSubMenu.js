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
import BooleanType from '../../../../utils/constants/BooleanType';
import SystemMenuForm from '../../../../utils/forms/systemManagement/SystemMenuForm';
import MenuRequest from '../../../../utils/dataModels/Menu/MenuRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './AddSystemSubMenu.scss';

class AddSystemSubMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      menuValue: {},
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

  setMenuValue = (menuValue) => {
    this.setState({ menuValue });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      ApiService.menu.readMenuById(id).then((response) => {
        this.setMenuValue(response);
      });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new MenuRequest({
      ...values,
      parentMenuId: state.id,
      menuType: '1',
    });
    ApiService.menu.createMenu(request).then((response) => {
      ModalHelper.openMessageModalByStatus({
        response,
        callback: props.history.goBack,
      });
    });
  };

  render() {
    const { props, state } = this;

    if (state.menuValue === null) return '';

    return (
      <Container>
        <div className="add-system-sub-menu">
          <SectionTitle
            title={props.language.systemManagement.subMenus.addSystemSubMenu}
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
                    <FormDescription
                      leftBorder
                      title={props.language.addSystemSubMenu.parentMenuName}
                      content={state.menuValue.menuName}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.addSystemSubMenu.menuName}
                      inputType="text"
                      inputName="menuName"
                      inputPlaceholder={
                        props.language.addSystemSubMenu.menuNameHint
                      }
                      inputValue={values.menuName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('menuName')}
                    />
                    <TextInput
                      title={props.language.addSystemSubMenu.sequenceNumber}
                      inputType="number"
                      inputName="sequenceNumber"
                      inputPlaceholder={
                        props.language.addSystemSubMenu.sequenceNumberHint
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
                      title={props.language.addSystemSubMenu.url}
                      inputType="text"
                      inputName="url"
                      inputPlaceholder={props.language.addSystemSubMenu.urlHint}
                      inputValue={values.url}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('url')}
                    />
                    <TextInput
                      title={props.language.addSystemSubMenu.controller}
                      inputType="text"
                      inputName="controller"
                      inputPlaceholder={
                        props.language.addSystemSubMenu.controllerHint
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
                      title={props.language.addSystemSubMenu.action}
                      inputType="text"
                      inputName="action"
                      inputPlaceholder={
                        props.language.addSystemSubMenu.actionHint
                      }
                      inputValue={values.action}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemMenuForm.isFieldRequired('action')}
                    />
                    <TextInput
                      title={props.language.addSystemSubMenu.param}
                      inputType="text"
                      inputName="param"
                      inputPlaceholder={
                        props.language.addSystemSubMenu.paramHint
                      }
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
                      title={props.language.addSystemSubMenu.isVisible}
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
                      title={props.language.addSystemSubMenu.isCreatable}
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
                      title={props.language.addSystemSubMenu.isUpdatable}
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
                      title={props.language.addSystemSubMenu.isDeletable}
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
                      title={props.language.addSystemSubMenu.isAuditable}
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
                      title={props.language.addSystemSubMenu.isExportable}
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
                      title={props.language.addSystemSubMenu.isExisted}
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
                      {props.language.addSystemSubMenu.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addSystemSubMenu.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addSystemSubMenu.submit}
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
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

AddSystemSubMenu.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddSystemSubMenu),
);

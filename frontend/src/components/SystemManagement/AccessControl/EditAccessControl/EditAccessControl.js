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
import QueryType from '../../../../utils/types/QueryType';

import './EditAccessControl.scss';

class EditAccessControl extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, formInitialValue: null };
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

  setFormInitialValue = (formInitialValue) => {
    this.setState({ formInitialValue });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      ApiService.roleMain.readRoleMainById(id).then((response) => {
        this.setFormInitialValue(response);
      });
    }
  };

  diplayAccessControl = ({ values, setFieldValue }) =>
    AccessControlConfig.map((item) => (
      <AccessControlListItem
        configItem={item}
        values={values}
        setFieldValue={setFieldValue}
      />
    ));

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new RoleMainRequest(values);
    ApiService.roleMain.updateRoleMain(state.id, request).then((response) => {
      ModalHelper.openMessageModalByStatus({
        response,
        callback: props.history.goBack,
      });
    });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <Container>
        <div className="edit-access-control">
          <SectionTitle
            title={props.language.systemManagement.subMenus.editAccessControl}
          />
          <Formik
            initialValues={AccessControlForm.initialValue(
              state.formInitialValue,
            )}
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
                      title={props.language.editAccessControl.roleName}
                      inputType="text"
                      inputName="roleName"
                      inputPlaceholder={
                        props.language.editAccessControl.roleNameHint
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
                      title={props.language.editAccessControl.roleMemo}
                      inputType="textarea"
                      inputName="roleMemo"
                      inputPlaceholder={
                        props.language.editAccessControl.roleMemoHint
                      }
                      inputValue={values.roleMemo}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={AccessControlForm.isFieldRequired('roleMemo')}
                    />
                  </FormRow>

                  <div className="access-control-table">
                    {this.diplayAccessControl({ values, setFieldValue })}
                  </div>

                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.editAccessControl.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.editAccessControl.clear}
                    </ButtonDiv>
                    <ButtonDiv className="save-button" onClick={submitForm}>
                      {props.language.editAccessControl.save}
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

EditAccessControl.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditAccessControl),
);

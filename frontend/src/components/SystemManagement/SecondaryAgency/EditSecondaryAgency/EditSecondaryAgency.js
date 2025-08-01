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

import ApiService from '../../../../utils/api/ApiService';
import SecondaryAgencyForm from '../../../../utils/forms/systemManagement/SecondaryAgencyForm';
import SecondaryAgencyRequest from '../../../../utils/dataModels/SecondaryAgency/SecondaryAgencyRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './EditSecondaryAgency.scss';

class EditSecondaryAgency extends React.PureComponent {
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
    const id = props.query.queryObject.get(QueryType.SECONDARY_ID);
    if (id !== null) {
      this.setId(id);
      ApiService.secondaryAgency
        .readSecondaryAgencyById(id)
        .then((response) => {
          this.setFormInitialValue(response);
        });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new SecondaryAgencyRequest({
      ...state.formInitialValue,
      ...values,
    });
    ApiService.secondaryAgency
      .updateSecondaryAgency(state.id, request)
      .then((response) => {
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
        <div className="edit-secondary-agency">
          <SectionTitle
            title={props.language.systemManagement.subMenus.editSecondaryAgency}
          />
          <Formik
            initialValues={SecondaryAgencyForm.initialValue(
              state.formInitialValue,
            )}
            validationSchema={SecondaryAgencyForm.validationSchema()}
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
                      title={
                        props.language.editSecondaryAgency.firstLevelAgency
                      }
                      content={state.formInitialValue.firstlevelAgency}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.editSecondaryAgency.fullName}
                      inputType="text"
                      inputName="fullName"
                      inputPlaceholder={
                        props.language.editSecondaryAgency.fullNameHint
                      }
                      inputValue={values.fullName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SecondaryAgencyForm.isFieldRequired('fullName')}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.editSecondaryAgency.shortName}
                      inputType="text"
                      inputName="shortName"
                      inputPlaceholder={
                        props.language.editSecondaryAgency.shortNameHint
                      }
                      inputValue={values.shortName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SecondaryAgencyForm.isFieldRequired(
                        'shortName',
                      )}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.editSecondaryAgency.enCode}
                      inputType="text"
                      inputName="enCode"
                      inputPlaceholder={
                        props.language.editSecondaryAgency.enCodeHint
                      }
                      inputValue={values.enCode}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SecondaryAgencyForm.isFieldRequired('enCode')}
                    />
                  </FormRow>
                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.editSecondaryAgency.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.editSecondaryAgency.clear}
                    </ButtonDiv>
                    <ButtonDiv className="save-button" onClick={submitForm}>
                      {props.language.editSecondaryAgency.save}
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

EditSecondaryAgency.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditSecondaryAgency),
);

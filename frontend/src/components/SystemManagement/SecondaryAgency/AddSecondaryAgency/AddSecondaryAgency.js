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

import './AddSecondaryAgency.scss';

class AddSecondaryAgency extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, firstLevelName: '' };
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

  setFirstLevelName = (firstLevelName) => {
    this.setState({ firstLevelName });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      ApiService.firstlevelAgency
        .readFirstlevelAgencyById(id)
        .then((response) => {
          this.setFirstLevelName(response.fullName);
        });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new SecondaryAgencyRequest({
      ...values,
      firstlevelAgencyId: state.id,
    });
    ApiService.secondaryAgency
      .createSecondaryAgency(request)
      .then((response) => {
        ModalHelper.openMessageModalByStatus({
          response,
          callback: props.history.goBack,
        });
      });
  };

  render() {
    const { props, state } = this;

    if (state.firstLevelName === '') return '';

    return (
      <Container>
        <div className="add-secondary-agency">
          <SectionTitle
            title={props.language.systemManagement.subMenus.addSecondaryAgency}
          />
          <Formik
            initialValues={SecondaryAgencyForm.initialValue({})}
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
                      title={props.language.addSecondaryAgency.firstLevelAgency}
                      content={state.firstLevelName}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.addSecondaryAgency.fullName}
                      inputType="text"
                      inputName="fullName"
                      inputPlaceholder={
                        props.language.addSecondaryAgency.fullNameHint
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
                      title={props.language.addSecondaryAgency.shortName}
                      inputType="text"
                      inputName="shortName"
                      inputPlaceholder={
                        props.language.addSecondaryAgency.shortNameHint
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
                      title={props.language.addSecondaryAgency.enCode}
                      inputType="text"
                      inputName="enCode"
                      inputPlaceholder={
                        props.language.addSecondaryAgency.enCodeHint
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
                      {props.language.addSecondaryAgency.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addSecondaryAgency.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addSecondaryAgency.submit}
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

AddSecondaryAgency.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddSecondaryAgency),
);

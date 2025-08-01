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
import MobilizationClassificationForm from '../../../../utils/forms/systemManagement/MobilizationClassificationForm';
import MobilizationClassificationRequest from '../../../../utils/dataModels/MobilizationClassification/MobilizationClassificationRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './AddMobilizationClassificationManagement.scss';

class AddMobilizationClassificationManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, mobilizationPlan: '' };
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

  setMobilizationPlan = (mobilizationPlan) => {
    this.setState({ mobilizationPlan });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      ApiService.mobilizationPlan
        .readMobilizationPlanById(id)
        .then((response) => {
          this.setMobilizationPlan(response.planName);
        });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new MobilizationClassificationRequest({
      ...values,
      mobilizationPlanId: state.id,
    });
    ApiService.mobilizationClassification
      .createMobilizationClassification(request)
      .then((response) => {
        ModalHelper.openMessageModalByStatus({
          response,
          callback: props.history.goBack,
        });
      });
  };

  render() {
    const { props, state } = this;

    if (state.mobilizationPlan === '') return '';

    return (
      <Container>
        <div className="add-mobilization-classification-management">
          <SectionTitle
            title={
              props.language.systemManagement.subMenus
                .addMobilizationClassificationManagement
            }
          />
          <Formik
            initialValues={MobilizationClassificationForm.initialValue({})}
            validationSchema={MobilizationClassificationForm.validationSchema()}
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
                        props.language.addMobilizationClassificationManagement
                          .mobilizationPlan
                      }
                      content={state.mobilizationPlan}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={
                        props.language.addMobilizationClassificationManagement
                          .classificationName
                      }
                      inputType="text"
                      inputName="classificationName"
                      inputPlaceholder={
                        props.language.addMobilizationClassificationManagement
                          .classificationNameHint
                      }
                      inputValue={values.classificationName}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={MobilizationClassificationForm.isFieldRequired(
                        'classificationName',
                      )}
                    />
                  </FormRow>
                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {
                        props.language.addMobilizationClassificationManagement
                          .back
                      }
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {
                        props.language.addMobilizationClassificationManagement
                          .clear
                      }
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {
                        props.language.addMobilizationClassificationManagement
                          .submit
                      }
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

AddMobilizationClassificationManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddMobilizationClassificationManagement),
);

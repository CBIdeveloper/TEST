import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import SectionTitle from '../../../../lib/components/SectionTitle/SectionTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';
import { setLoading } from '../../../../store/loading/slice';
import ApiService from '../../../../utils/api/ApiService';
import RegulationForm from '../../../../utils/forms/retrievalService/regulation/RegulationForm';
import RegulationRequest from '../../../../utils/dataModels/Regulation/RegulationRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './EditRegulationManagement.scss';

class EditRegulationManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, formInitialValues: null, title: '' };
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

  setFormInitialValues = (formInitialValues) => {
    this.setState({ formInitialValues });
  };

  setTitle = (title) => {
    this.setState({ title });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    this.setId(id);
    if (id !== null) {
      ApiService.regulation.readRegulationById(id).then((response) => {
        this.setFormInitialValues(response);
        this.setTitle(response.regulationTypeString);
      });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new RegulationRequest(values);
    props.setLoading(true);
    ApiService.regulation
      .updateRegulation(state.id, request)
      .then((response) => {
        props.setLoading(false);
        ModalHelper.openMessageModalByStatus({
          response,
          callback: props.history.goBack,
        });
      });
  };

  render() {
    const { props, state } = this;

    if (state.formInitialValues === null || state.title === '') return '';

    return (
      <div className="edit-regulation-management">
        <SectionTitle title={state.title} />
        <Formik
          enableReinitialize
          initialValues={RegulationForm.initialValue(state.formInitialValues)}
          validationSchema={RegulationForm.validationSchema()}
          onSubmit={this.onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
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
                    title={props.language.editRegulation.regulationName}
                    inputType="text"
                    inputName="regulationName"
                    inputPlaceholder={
                      props.language.editRegulation.regulationNameHint
                    }
                    inputValue={values.regulationName}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={RegulationForm.isFieldRequired('regulationName')}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    full
                    title={props.language.editRegulation.regulationUrl}
                    inputType="text"
                    inputName="regulationUrl"
                    inputPlaceholder={
                      props.language.editRegulation.regulationUrlHint
                    }
                    inputValue={values.regulationUrl}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={RegulationForm.isFieldRequired('regulationUrl')}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    full
                    title={props.language.editRegulation.remark}
                    inputType="textarea"
                    inputName="remark"
                    inputPlaceholder={props.language.editRegulation.remarkHint}
                    inputValue={values.remark}
                    inputOnChange={handleChange}
                    touched={touched}
                    errors={errors}
                    required={RegulationForm.isFieldRequired('remark')}
                  />
                </FormRow>

                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.editRegulation.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.editRegulation.clear}
                  </ButtonDiv>
                  <ButtonDiv className="save-button" onClick={submitForm}>
                    {props.language.editRegulation.save}
                  </ButtonDiv>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

EditRegulationManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditRegulationManagement),
);

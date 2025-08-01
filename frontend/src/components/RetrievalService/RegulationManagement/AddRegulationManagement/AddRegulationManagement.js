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
import RegulationEnumType from '../../../../utils/constants/RegulationEnumType';
import RegulationForm from '../../../../utils/forms/retrievalService/regulation/RegulationForm';
import RegulationRequest from '../../../../utils/dataModels/Regulation/RegulationRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './AddRegulationManagement.scss';

class AddRegulationManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { type: null, title: '' };
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

  setType = (type) => {
    this.setState({ type });
  };

  setTitle = (title) => {
    this.setState({ title });
  };

  initState = () => {
    const { props } = this;
    const type = props.query.queryObject.get(QueryType.TYPE);
    this.setType(type);
    if (type !== null) {
      const regulationItem = RegulationEnumType[Number(type) - 1];
      if (regulationItem !== undefined) {
        this.setTitle(regulationItem.text);
      }
    }
  };

  onSubmit = (values) => {
    const { props } = this;
    props.setLoading(true);
    const request = new RegulationRequest(values);
    ApiService.regulation.createRegulation(request).then((response) => {
      props.setLoading(false);
      ModalHelper.openMessageModalByStatus({
        response,
        callback: props.history.goBack,
      });
    });
  };

  render() {
    const { props, state } = this;

    if (state.type === null) return '';

    return (
      <div className="add-regulation-management">
        <SectionTitle title={state.title} />
        <Formik
          initialValues={RegulationForm.initialValue({
            regulationType: Number(state.type),
          })}
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
                    title={props.language.addRegulation.regulationName}
                    inputType="text"
                    inputName="regulationName"
                    inputPlaceholder={
                      props.language.addRegulation.regulationNameHint
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
                    title={props.language.addRegulation.regulationUrl}
                    inputType="text"
                    inputName="regulationUrl"
                    inputPlaceholder={
                      props.language.addRegulation.regulationUrlHint
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
                    title={props.language.addRegulation.remark}
                    inputType="textarea"
                    inputName="remark"
                    inputPlaceholder={props.language.addRegulation.remarkHint}
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
                    {props.language.addRegulation.back}
                  </ButtonDiv>
                  <ButtonDiv className="normal-button" onClick={resetForm}>
                    {props.language.addRegulation.clear}
                  </ButtonDiv>
                  <ButtonDiv className="submit-button" onClick={submitForm}>
                    {props.language.addRegulation.submit}
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

AddRegulationManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddRegulationManagement),
);

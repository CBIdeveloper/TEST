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
import SystemCodeSetForm from '../../../../utils/forms/systemManagement/SystemCodeSetForm';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './EditSystemCodeSet.scss';

class EditSystemCodeSet extends React.PureComponent {
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
    const id = props.query.queryObject.get(QueryType.CODE_ID);
    if (id !== null) {
      this.setId(id);
      ApiService.codefile.readCodefileById(id).then((response) => {
        this.setFormInitialValue({
          ...response,
          codeId: response.codeId.slice(-3),
        });
      });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new CodefileRequest({
      ...state.formInitialValue,
      ...values,
      codeId: `${state.formInitialValue.parentCodeId}${values.codeId.padStart(
        3,
        '0',
      )}`,
    });
    ApiService.codefile.updateCodefile(state.id, request).then((response) => {
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
        <div className="edit-system-code-set">
          <SectionTitle
            title={props.language.systemManagement.subMenus.editSystemCodeSet}
          />
          <Formik
            initialValues={SystemCodeSetForm.initialValue(
              state.formInitialValue,
            )}
            validationSchema={SystemCodeSetForm.validationSchema()}
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
                      title={props.language.editSystemCodeSet.codeId}
                      inputType="number"
                      inputName="codeId"
                      inputPlaceholder={
                        props.language.editSystemCodeSet.codeIdHint
                      }
                      inputValue={values.codeId}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemCodeSetForm.isFieldRequired('codeId')}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.editSystemCodeSet.name}
                      inputType="text"
                      inputName="name"
                      inputPlaceholder={
                        props.language.editSystemCodeSet.nameHint
                      }
                      inputValue={values.name}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemCodeSetForm.isFieldRequired('name')}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.editSystemCodeSet.sequenceNumber}
                      inputType="number"
                      inputName="sequenceNumber"
                      inputPlaceholder={
                        props.language.editSystemCodeSet.sequenceNumberHint
                      }
                      inputValue={values.sequenceNumber}
                      inputOnChange={handleChange}
                      touched={touched}
                      errors={errors}
                      required={SystemCodeSetForm.isFieldRequired(
                        'sequenceNumber',
                      )}
                    />
                  </FormRow>
                  <div className="action-button-container">
                    <ButtonDiv
                      className="normal-button"
                      onClick={props.history.goBack}
                    >
                      {props.language.editSystemCodeSet.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.editSystemCodeSet.clear}
                    </ButtonDiv>
                    <ButtonDiv className="save-button" onClick={submitForm}>
                      {props.language.editSystemCodeSet.save}
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

EditSystemCodeSet.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditSystemCodeSet),
);

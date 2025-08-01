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
import CodefileRequest from '../../../../utils/dataModels/Codefile/CodefileRequest';
import SystemCodeSetForm from '../../../../utils/forms/systemManagement/SystemCodeSetForm';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import QueryType from '../../../../utils/types/QueryType';

import './AddSystemCodeSet.scss';

class AddSystemCodeSet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { id: null, systemCodeName: '', parentCodeId: '' };
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

  setSystemCodeName = (systemCodeName) => {
    this.setState({ systemCodeName });
  };

  setParentCodeId = (parentCodeId) => {
    this.setState({ parentCodeId });
  };

  initState = () => {
    const { props } = this;
    const id = props.query.queryObject.get(QueryType.ID);
    if (id !== null) {
      this.setId(id);
      ApiService.codefile.readCodefileById(id).then((response) => {
        this.setSystemCodeName(response.name);
        this.setParentCodeId(response.codeId);
      });
    }
  };

  onSubmit = (values) => {
    const { props, state } = this;
    const request = new CodefileRequest({
      ...values,
      codeId: `${state.parentCodeId}${values.codeId.length >= 3 ? values.codeId.padStart(3, '0') : values.codeId}`,
      heading: '',
      isExisted: true,
      parentCodeId: state.parentCodeId,
    });
    ApiService.codefile.createCodefile(request).then((response) => {
      ModalHelper.openMessageModalByStatus({
        response,
        callback: props.history.goBack,
      });
    });
  };

  render() {
    const { props, state } = this;

    return (
      <Container>
        <div className="add-system-code-set">
          <SectionTitle
            title={props.language.systemManagement.subMenus.addSystemCodeSet}
          />
          <Formik
            initialValues={SystemCodeSetForm.initialValue({})}
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
                    <FormDescription
                      leftBorder
                      title={props.language.addSystemCodeSet.codeChineseName}
                      content={state.systemCodeName}
                    />
                  </FormRow>
                  <FormRow>
                    <TextInput
                      title={props.language.addSystemCodeSet.codeId}
                      inputType="number"
                      inputName="codeId"
                      inputPlaceholder={
                        props.language.addSystemCodeSet.codeIdHint
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
                      title={props.language.addSystemCodeSet.name}
                      inputType="text"
                      inputName="name"
                      inputPlaceholder={
                        props.language.addSystemCodeSet.nameHint
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
                      title={props.language.addSystemCodeSet.sequenceNumber}
                      inputType="number"
                      inputName="sequenceNumber"
                      inputPlaceholder={
                        props.language.addSystemCodeSet.sequenceNumberHint
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
                      {props.language.addSystemCodeSet.back}
                    </ButtonDiv>
                    <ButtonDiv className="normal-button" onClick={resetForm}>
                      {props.language.addSystemCodeSet.clear}
                    </ButtonDiv>
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.addSystemCodeSet.submit}
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

AddSystemCodeSet.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddSystemCodeSet),
);

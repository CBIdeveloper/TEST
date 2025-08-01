import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../lib/components/Container/Container';
import FormRow from '../../lib/components/FormRow/FormRow';
import Header from '../Header/Header';
import SectionTitle from '../../lib/components/SectionTitle/SectionTitle';
import Table from '../../lib/components/Table/Table';
import TextInput from '../../lib/components/inputs/TextInput/TextInput';
import ValidateInput from '../../lib/components/inputs/ValidateInput/ValidateInput';

import ApiService from '../../utils/api/ApiService';
import ModalHelper from '../../utils/helper/ModalHelper';
import RegisterProgressForm from '../../utils/forms/RegisterProgressForm';
import RegisterProgressTable from '../../utils/tables/RegisterProgressTable';

import './RegisterProgress.scss';

class RegisterProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [], validateTimestamp: new Date() };
    this.table = new RegisterProgressTable();
  }

  setTableData = (tableData) => {
    this.setState({ tableData });
  };

  setValidateTimestamp = (validateTimestamp) => {
    this.setState({ validateTimestamp });
  };

  onSubmit = (values) => {
    const { props } = this;
    ApiService.sysUserAccount
      .getAppliedStatus({
        identityNumber: values.pid,
        name: values.name,
        captchaCode: values.validate,
      })
      .then((response) => {
        if (!response.executed) {
          ModalHelper.openErrorModal({
            message: props.language.registerProgress.notFound,
          });
          this.setValidateTimestamp(new Date());
        } else {
          this.setTableData([response]);
        }
        this.setValidateTimestamp(new Date());
      })
      .catch(() => {
        this.setValidateTimestamp(new Date());
      });
  };

  displayProgress = () => {
    const { props, state } = this;
    return state.tableData.length > 0 ? (
      <div className="progress-table-container">
        <SectionTitle title={props.language.registerProgress.result} />
        <Table data={state.tableData} columns={this.table.getTableHeader()} />
      </div>
    ) : (
      ''
    );
  };

  render() {
    const { props, state } = this;

    return (
      <div className="register-progress">
        <Header logoOnly />
        <div className="progress-container">
          <Container breadcrumb={false}>
            <SectionTitle title={props.language.registerProgress.title} />
            <Formik
              enableReinitialize
              initialValues={RegisterProgressForm.initialValue({})}
              validationSchema={RegisterProgressForm.validationSchema()}
              onSubmit={this.onSubmit}
            >
              {({
                handleSubmit,
                handleChange,
                resetForm,
                setFieldValue,
                submitForm,
                touched,
                values,
                errors,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="form"
                  autoComplete="off"
                >
                  <div className="inputs">
                    <FormRow fit={false}>
                      <TextInput
                        title={props.language.registerProgress.name}
                        inputType="text"
                        inputName="name"
                        inputPlaceholder={
                          props.language.registerProgress.nameHint
                        }
                        inputValue={values.name}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterProgressForm.isFieldRequired('name')}
                      />
                    </FormRow>
                    <FormRow fit={false}>
                      <TextInput
                        title={props.language.registerProgress.pid}
                        inputType="text"
                        inputName="pid"
                        inputPlaceholder={
                          props.language.registerProgress.pidHint
                        }
                        inputValue={values.pid}
                        inputOnChange={handleChange}
                        touched={touched}
                        errors={errors}
                        required={RegisterProgressForm.isFieldRequired('pid')}
                      />
                    </FormRow>
                    <FormRow fit={false}>
                      <ValidateInput
                        inputName="validate"
                        inputValue={values.validate}
                        setFieldValue={setFieldValue}
                        validateTimestamp={state.validateTimestamp}
                        errors={errors}
                        touched={touched}
                        required
                      />
                      <div />
                    </FormRow>
                    <div className="action-button-container">
                      <ButtonDiv
                        className="reset-button"
                        onClick={props.history.goBack}
                      >
                        {props.language.registerProgress.back}
                      </ButtonDiv>
                      <ButtonDiv className="reset-button" onClick={resetForm}>
                        {props.language.registerProgress.clear}
                      </ButtonDiv>
                      <ButtonDiv className="search-button" onClick={submitForm}>
                        {props.language.registerProgress.search}
                      </ButtonDiv>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
            {this.displayProgress()}
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

RegisterProgress.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterProgress),
);

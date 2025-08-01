import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../../../lib/components/Container/Container';
import FormDescription from '../../../../lib/components/FormDescription/FormDescription';
import FormRow from '../../../../lib/components/FormRow/FormRow';
import PageTitle from '../../../../lib/components/PageTitle/PageTitle';
import TextInput from '../../../../lib/components/inputs/TextInput/TextInput';

import { setLoading } from '../../../../store/loading/slice';

import ApiService from '../../../../utils/api/ApiService';
import PermissionApplicationForm from '../../../../utils/forms/systemManagement/PermissionApplicationForm';
import PermissionApplicationRequest from '../../../../utils/dataModels/PermissionApplication/PermissionApplicationRequest';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import { userHasRole,getUnitName,getName } from '../../../../utils/auth/auth';

import './AddPermissionApplication.scss';
import DateTimeInput from '../../../../lib/components/inputs/DateTimeInput/DateTimeInput';
import { dateObjectToDateString } from '../../../../utils/parsers/dateParser';
import FormikErrorModal from '../../../../lib/components/FormikErrorModal/FormikErrorModal';
//明碼權限申請
class AddPermissionApplicationDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      braidingCategory: null,
    };
  }

  componentDidMount() {
    this.initState();
  }

  initState = () => {
    ApiService.sysUserAccount
      .readSysUserAccountBraidingCategory()
      .then((response) => {
        this.setBraidingCategory(response.braiding_category);
      });
  };

  setBraidingCategory = (braidingCategory) => {
    this.setState({ braidingCategory });
  };

  onSubmit = (values) => {
    const { props } = this;
    const request = new PermissionApplicationRequest(values);
    // TODO: alarm before is plan sponsor approve...
    console.log(request);
    ModalHelper.openPropsConfirmModal({
      title: props.language.permissionApplicationDetailConfirmModal.title,
      Message: props.language.permissionApplicationDetailConfirmModal.message,
      confirmFunction: (callback) => {
        ApiService.permissionApplication
          .createPermissionApplication(request)
          .then((response) => {
            callback();
            ModalHelper.openMessageModalByStatus({
              response,
              callback: props.history.goBack,
            });
          });
      },
    });
  };

  render() {
    const { props, state } = this;

    if (state.braidingCategory === null) {
      return null;
    }

    const version = VERSION;

    return (
      <Container className="add-permission-application">
        <div>
          <PageTitle
            title={
              props.language.systemManagement.subMenus
                .systemPermissionApplication
            }
            breadcrumb={false}
          />
          <Formik
            initialValues={PermissionApplicationForm.initialValue({})}
            validationSchema={PermissionApplicationForm.validationSchema()}
            onSubmit={this.onSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              resetForm,
              isSubmitting,
              submitForm,
              values,
              touched,
              errors,
            }) => (
              <form onSubmit={handleSubmit} className="form" autoComplete="off">
                <FormikErrorModal isSubmitting={isSubmitting} errors={errors} />
                <div className="inputs">
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.addPermissionApplication.name}
                      content={getName()}
                    />
                  </FormRow>
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.addPermissionApplication.unitName}
                      content={getUnitName()}
                    />
                  </FormRow>
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={props.language.addPermissionApplication.applyDate}
                      content={dateObjectToDateString(new Date())}
                    />
                  </FormRow>
                  <FormRow>
                    <div className="date-containers">
                      <div className="use-date-container">
                        <DateTimeInput
                          title={
                            props.language.addPermissionApplication.useDate
                          }
                          inputName="useStartDate"
                          inputPlaceholder={
                            props.language.addPermissionApplication
                              .useStartDateHint
                          }
                          inputValue={values.useStartDate}
                          setFieldValue={setFieldValue}
                          maxDate={values.useEndDate}
                          required
                          touched={touched}
                          errors={errors}
                        />
                        <span>~</span>
                        <DateTimeInput
                          title=""
                          inputName="useEndDate"
                          inputPlaceholder={
                            props.language.addPermissionApplication
                              .useEndDateHint
                          }
                          inputValue={values.useEndDate}
                          setFieldValue={setFieldValue}
                          minDate={values.useStartDate}
                          touched={touched}
                          errors={errors}
                        />
                      </div>
                    </div>
                  </FormRow>
                  <FormRow>
                    <TextInput
                      full
                      title={
                        props.language.addPermissionApplication.requirements
                      }
                      inputType="textarea"
                      inputName="requirements"
                      inputValue={values.requirements}
                      inputOnChange={handleChange}
                      required
                      touched={touched}
                      errors={errors}
                    />
                  </FormRow>
                  <FormRow>
                    <FormDescription
                      leftBorder
                      title={
                        props.language.permissionApplicationDetail
                          .braidingCategory
                      }
                      content={state.braidingCategory}
                    />
                  </FormRow>
                </div>
                <div className="action-button-container">
                  <ButtonDiv
                    className="normal-button"
                    onClick={props.history.goBack}
                  >
                    {props.language.addPermissionApplication.back}
                  </ButtonDiv>
                  <ButtonDiv
                    className="normal-button"
                    onClick={resetForm}
                    display={userHasRole(166)}
                  >
                    {props.language.addPermissionApplication.clear}
                  </ButtonDiv>
                  <ButtonDiv
                    className="submit-button"
                    onClick={submitForm}
                    display={userHasRole(166)}
                  >
                    {props.language.addPermissionApplication.submit}
                  </ButtonDiv>
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

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

AddPermissionApplicationDetail.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddPermissionApplicationDetail),
);

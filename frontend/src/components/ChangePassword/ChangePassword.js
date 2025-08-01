import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../lib/components/ButtonDiv/ButtonDiv';
import Container from '../../lib/components/Container/Container';
import Divider from '../../lib/components/Divider/Divider';
import TextInput from '../../lib/components/inputs/TextInput/TextInput';
import PageTitle from '../../lib/components/PageTitle/PageTitle';

import ApiService from '../../utils/api/ApiService';
import ChangePasswordForm from '../../utils/forms/ChangePasswordForm';
import ChangePasswordRequest from '../../utils/dataModels/SysUserAccount/ChangePasswordRequest';
import ModalHelper from '../../utils/helper/ModalHelper';
import Path from '../../utils/path/path';
import { getUserId, setChangeRequired } from '../../utils/auth/auth';

import './ChangePassword.scss';

import checkboxChecked from '../../assets/images/icons/checkbox_check.png';
import checkboxNone from '../../assets/images/icons/checkbox_none.png';

class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClearText: false,
    };
  }

  togglePassword = () => {
    const { isClearText } = this.state;
    this.setState({ isClearText: !isClearText });
  };

  InputType = () => {
    const { isClearText } = this.state;
    return isClearText ? 'text' : 'password';
  };

  trailingIcon = () => {
    const { props, state } = this;
    return state.isClearText ? (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxChecked} alt="checkbox" />
        <div>{props.language.changePassword.display}</div>
      </div>
    ) : (
      <div className="password-toggle">
        <img className="checkbox" src={checkboxNone} alt="checkbox" />
        <div>{props.language.changePassword.display}</div>
      </div>
    );
  };

  onSubmit = (values) => {
    const { props } = this;
    const request = new ChangePasswordRequest({
      changedPassword: values.accountVerification,
    });
    ApiService.sysUserAccount
      .changePassword(getUserId(), request)
      .then((response) => {
        ModalHelper.openMessageModalByStatus({
          response,
          callback: () => {
            setChangeRequired(false);
            props.history.push(Path.mainPath);
          },
        });
      });
  };

  render() {
    const { props } = this;

    return (
      <div className="change-password">
        <Container>
          <div className="change-password-form">
            <PageTitle
              title={props.language.changePassword.title}
              breadcrumb={false}
            />
            <Formik
              initialValues={ChangePasswordForm.initialValue({})}
              validationSchema={ChangePasswordForm.validationSchema()}
              onSubmit={this.onSubmit}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                submitForm,
                touched,
                errors,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="form"
                  autoComplete="off"
                >
                  <div className="remark-container">
                    <TextInput
                      title={props.language.changePassword.accountVerification}
                      inputType={this.InputType()}
                      inputName="accountVerification"
                      inputPlaceholder={
                        props.language.changePassword.accountVerificationHint
                      }
                      inputValue={values.accountVerification}
                      inputOnChange={handleChange}
                      trailingIcon={this.trailingIcon()}
                      iconOnClick={this.togglePassword}
                      touched={touched}
                      errors={errors}
                      required
                      description={
                        props.language.changePassword.passwordDescription
                      }
                    />
                    {/* <TextInput */}
                    {/*  title={ */}
                    {/*    props.language.changePassword.accountVerificationCheck */}
                    {/*  } */}
                    {/*  inputType={this.InputType()} */}
                    {/*  inputName="accountVerification" */}
                    {/*  inputPlaceholder={ */}
                    {/*    props.language.changePassword */}
                    {/*      .accountVerificationCheckHint */}
                    {/*  } */}
                    {/*  inputValue={values.accountVerificationCheck} */}
                    {/*  inputOnChange={handleChange} */}
                    {/*  trailingIcon={this.trailingIcon()} */}
                    {/*  iconOnClick={this.togglePassword} */}
                    {/*  touched={touched} */}
                    {/*  errors={errors} */}
                    {/*  required */}
                    {/* /> */}
                  </div>
                  <Divider />
                  <div className="action-button-container">
                    <ButtonDiv className="submit-button" onClick={submitForm}>
                      {props.language.changePassword.confirm}
                    </ButtonDiv>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

ChangePassword.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword),
);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';
import ValidateInput from '../../../lib/components/inputs/ValidateInput/ValidateInput';

import { setLoading } from '../../../store/loading/slice';

import ApiService from '../../../utils/api/ApiService';
import LoginForm from '../../../utils/forms/LoginForm';
import Path from '../../../utils/path/path';
import SignInRequest from '../../../utils/dataModels/Authentication/SignInRequest';
import {
  saveToken,
  saveTokenAndUserInfo,
  setChangeRequired,
} from '../../../utils/auth/auth';

import './AccountLogin.scss';

class AccountLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navigatePage: Path.mainPath,
      isClearText: false,
      validateTimestamp: new Date(),
    };
  }

  setValidateTimestamp = (validateTimestamp) => {
    this.setState({ validateTimestamp });
  };

  togglePassword = () => {
    const { isClearText } = this.state;
    this.setState({ isClearText: !isClearText });
  };

  InputType = () => {
    const { isClearText } = this.state;
    return isClearText ? 'text' : 'password';
  };

  trailingIcon = () => {
    const { isClearText } = this.state;
    return isClearText ? (
      <FaRegEyeSlash size={20} />
    ) : (
      <FaEye size={20} />
    );
  };

  navigatePage = () => {
    const { props, state } = this;
    props.history.replace(state.navigatePage);
  };

  onSubmit = (values) => {
    const { props } = this;
    props.setLoading(true);
    const request = new SignInRequest({
      username: values.account,
      password: values.accountVerification,
      captchaCode: values.validate,
    });
    ApiService.authentication
      .signIn(request)
      .then((response) => {
        saveToken({
          access_token: response.accessToken,
          access_token_expired_at: response.accessTokenExpiredAt,
          refresh_token: response.refreshToken,
          refresh_token_expired_at: response.refreshTokenExpiredAt,
        }).then(() => {
          ApiService.sysUserAccount
            .readSysUserAccountById(response.id)
            .then((employeeResponse) => {
              saveTokenAndUserInfo({
                account: values.account,
                access_token: response.accessToken,
                access_token_expired_at: response.accessTokenExpiredAt,
                refresh_token: response.refreshToken,
                refresh_token_expired_at: response.refreshTokenExpiredAt,
                userId: response.id,
                name: employeeResponse.name,
                jobPosition: employeeResponse.jobPosition,
                agencyType: employeeResponse.agencyType,
                firstlevelAgencyId: employeeResponse.firstlevelAgencyId,
                secondaryAgencyId: employeeResponse.secondaryAgencyId,
                cityId: employeeResponse.cityId,
                firstlevelUnitId: employeeResponse.firstlevelUnitId,
                unitName: employeeResponse.workPlace,
                businessPlan: employeeResponse.businessPlan,
                rolePermissionGroupIdList:
                  employeeResponse.rolePermissionGroupIdList,
                rolePermissionIdList: employeeResponse.rolePermissionIdList,
                militaryagencyId: employeeResponse.militaryagencyId,
                businessPhone: employeeResponse.businessPhone,
                telephoneExtension: employeeResponse.telephoneExtension,
              });
              props.setLoading(false);
              if (response.code === '20008') {
                setChangeRequired(true);
                props.history.replace(Path.changePasswordPath);
              } else {
                this.navigatePage();
              }
            })
            .catch(() => {
              props.setLoading(false);
            });
        });
      })
      .catch(() => {
        props.setLoading(false);
        this.setValidateTimestamp(new Date());
      });
  };

  render() {
    const { props, state } = this;

    return (
      <div className="account-login">
        <Formik
          initialValues={LoginForm.initialValue({})}
          validationSchema={LoginForm.validationSchema()}
          onSubmit={this.onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            submitForm,
            touched,
            values,
            errors,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="login-form"
              autoComplete="off"
            >
              <TextInput
                title={props.language.accountLogin.account}
                inputType="text"
                inputName="account"
                inputPlaceholder={props.language.accountLogin.accountHint}
                inputValue={values.account}
                inputOnChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <TextInput
                title={props.language.accountLogin.password}
                inputType={this.InputType()}
                inputName="accountVerification"
                inputPlaceholder={props.language.accountLogin.passwordHint}
                inputValue={values.accountVerification}
                inputOnChange={handleChange}
                trailingIcon={this.trailingIcon()}
                iconOnClick={this.togglePassword}
                touched={touched}
                errors={errors}
              />
              <ValidateInput
                inputName="validate"
                inputValue={values.validate}
                setFieldValue={setFieldValue}
                validateTimestamp={state.validateTimestamp}
                errors={errors}
                touched={touched}
              />
              <ButtonDiv className="login-button" onClick={submitForm}>
                {props.language.accountLogin.login}
              </ButtonDiv>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

AccountLogin.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccountLogin),
);

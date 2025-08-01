import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';
// import ValidateInput from '../../../lib/components/inputs/ValidateInput/ValidateInput';
import LoginForm from '../../../utils/forms/LoginForm';
import Path from '../../../utils/path/path';

import { setLoading } from '../../../store/loading/slice';

import ApiService from '../../../utils/api/ApiService';
import ModalHelper from '../../../utils/helper/ModalHelper';
import SignInByIdentityNumberRequest from '../../../utils/dataModels/Authentication/signInByIdentityNumberRequest';
import { saveToken, saveTokenAndUserInfo } from '../../../utils/auth/auth';

import './CertificateLogin.scss';

class CertificateLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navigatePage: Path.mainPath,
      isClearText: false,
      isAccountClearText: false,
      // validateTimestamp: new Date(),
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.receiveMessage, false);
  }

  // setValidateTimestamp = (validateTimestamp) => {
  //   this.setState({ validateTimestamp });
  // };

  popupCenter = (url, title, w, h) => {
    let top = window.screen.height - h;
    top = top > 0 ? top / 2 : 0;

    let left = window.screen.width - w;
    left = left > 0 ? left / 2 : 0;

    this.postTarget = window.open(
      url,
      title,
      `toolbar=no, scrollbars=no, resizable=no, location=no, menubar=no, status=no, width=${w}, height=${h}, top=${top}, left=${left}`,
    );
    if (window.focus) this.postTarget.focus();
  };

  receiveMessage = (event) => {
    if (event.origin !== 'http://localhost:61161') {
      return;
    }

    try {
      const ret = JSON.parse(event.data);
      if (ret.func) {
        if (ret.func === 'getTbs') {
          const json = this.getTbsPackage();
          this.postTarget.postMessage(json, 'http://localhost:61161');
        } else if (ret.func === 'sign') {
          this.setSignature(event.data);
        }
      } else {
        console.error('無此函式和功能');
      }
    } catch (error) {
      console.error(error);
    }
  };

  setSignature = (signature) => {
    const { props, state } = this;
    const signatureObject = JSON.parse(signature);
    const { ret_code } = signatureObject;
    if (ret_code === 0) {
      const request = new SignInByIdentityNumberRequest(state.values);
      ApiService.authentication
        .signInByIdentityNumber(request)
        .then((response) => {
          saveToken({
            access_token: response.accessToken,
            access_token_expired_at: response.accessTokenExpiredAt,
            refresh_token: response.refreshToken,
            refresh_token_expired_at: response.refreshTokenExpiredAt,
          })
            .then(() => {
              props.setLoading(false);
              ApiService.sysUserAccount
                .readSysUserAccountById(response.id)
                .then((employeeResponse) => {
                  saveTokenAndUserInfo({
                    account: state.values.account,
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
                  this.navigatePage();
                });
            })
            .catch(() => {
              props.setLoading(false);
            });
        })
        .catch(() => {
          props.setLoading(false);
          // this.setValidateTimestamp(new Date());
        });
    } else {
      props.setLoading(false);
      const { message } = signatureObject;
      ModalHelper.openErrorModal({
        message,
      });
    }
  };

  getTbsPackage = () => {
    const { state } = this;
    const tbsData = {};
    tbsData.tbs = 'TBS';
    tbsData.tbsEncoding = 'NONE';
    tbsData.hashAlgorithm = 'SHA256';
    tbsData.withCardSN = 'true';
    tbsData.pin = state.values.accountVerification;
    tbsData.nonce = '';
    tbsData.func = 'MakeSignature';
    tbsData.signatureType = 'PKCS7';
    return JSON.stringify(tbsData).replace(/\+/g, '%2B');
  };

  toggleAccount = () => {
    const { isAccountClearText } = this.state;
    this.setState({ isAccountClearText: !isAccountClearText });
  };

  togglePassword = () => {
    const { isClearText } = this.state;
    this.setState({ isClearText: !isClearText });
  };

  accountInputType = (text) => {
    const { isAccountClearText } = this.state;
    return isAccountClearText ? 'text' : 'password';
  };

  InputType = () => {
    const { isClearText } = this.state;
    return isClearText ? 'text' : 'password';
  };

  trailingAccountIcon = () => {
    const { isAccountClearText } = this.state;
    return isAccountClearText ? (
      <FaRegEyeSlash size={20} />
    ) : (
      <FaEye size={20} />
    );
  };

  trailingPasswordIcon = () => {
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
    this.setState({ values });
    this.popupCenter('http://localhost:61161/popupForm', '簽章中', 160, 200);
  };

  openPlugInPage = () => {
    window.open('https://moica.nat.gov.tw/rac_plugin.html', '_blank');
  };

  render() {
    const { props, state } = this;

    return (
      <div className="certificate-login">
        <Formik
          initialValues={LoginForm.initialValue({})}
          validationSchema={LoginForm.validationSchema()}
          onSubmit={this.onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            // setFieldValue,
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
              <div className="certificate-description">
                <div>{props.language.certificateLogin.firstDescription}</div>
                <div className="second-description">
                  <div>
                    {props.language.certificateLogin.secondDescriptionOne}
                  </div>
                  <ButtonDiv className="link" onClick={this.openPlugInPage}>
                    {props.language.certificateLogin.secondDescriptionTwo}
                  </ButtonDiv>
                  <div>
                    {props.language.certificateLogin.secondDescriptionThree}
                  </div>
                </div>
              </div>
              <TextInput
                title={props.language.certificateLogin.account}
                inputType={this.accountInputType(values.account)}
                inputName="account"
                inputPlaceholder={props.language.certificateLogin.accountHint}
                inputValue={values.account}
                inputOnChange={handleChange}
                trailingIcon={this.trailingAccountIcon()}
                iconOnClick={this.toggleAccount}
                touched={touched}
                errors={errors}
              />
              <TextInput
                title={props.language.certificateLogin.password}
                inputType={this.InputType()}
                inputName="accountVerification"
                inputPlaceholder={props.language.certificateLogin.passwordHint}
                inputValue={values.accountVerification}
                inputOnChange={handleChange}
                trailingIcon={this.trailingPasswordIcon()}
                iconOnClick={this.togglePassword}
                touched={touched}
                errors={errors}
              />
              {/*<ValidateInput*/}
              {/*  inputName="validate"*/}
              {/*  inputValue={values.validate}*/}
              {/*  setFieldValue={setFieldValue}*/}
              {/*  validateTimestamp={state.validateTimestamp}*/}
              {/*  errors={errors}*/}
              {/*  touched={touched}*/}
              {/*/>*/}
              <ButtonDiv className="login-button" onClick={submitForm}>
                {props.language.certificateLogin.login}
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

CertificateLogin.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CertificateLogin),
);

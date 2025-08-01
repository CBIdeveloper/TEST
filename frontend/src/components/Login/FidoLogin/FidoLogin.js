import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import TextInput from '../../../lib/components/inputs/TextInput/TextInput';
import FidoLoginForm from '../../../utils/forms/FidoLoginForm';
import Path from '../../../utils/path/path';

import { setLoading } from '../../../store/loading/slice';

import ApiService from '../../../utils/api/ApiService';
import SignInFidoPushRequest from '../../../utils/dataModels/Authentication/SignInFidoPushRequest';
import SignInFidoResultRequest from '../../../utils/dataModels/Authentication/SignInFidoResultRequest';
import { saveToken, saveTokenAndUserInfo } from '../../../utils/auth/auth';

import './FidoLogin.scss';

class FidoLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navigatePage: Path.mainPath,
      // validateTimestamp: new Date(),
      token: '',
    };
    this.loginHandler = null;
  }

  navigatePage = () => {
    const { props, state } = this;
    props.history.replace(state.navigatePage);
  };

  toggleAccount = () => {
    const { isAccountClearText } = this.state;
    this.setState({ isAccountClearText: !isAccountClearText });
  };

  accountInputType = (text) => {
    const { isAccountClearText } = this.state;
    return isAccountClearText ? 'text' : 'password';
  };

  trailingAccountIcon = () => {
    const { isAccountClearText } = this.state;
    return isAccountClearText ? (
      <FaRegEyeSlash size={20} />
    ) : (
      <FaEye size={20} />
    );
  };

  onSubmit = (values, actions) => {
    const { props } = this;
    props.setLoading(true);
    this.setState({ values });

    const request_push = new SignInFidoPushRequest({
      id_num: values.account,
    });

    if (values.loginType === 'qr') {
      // QR Code 登入邏輯
      // console.log('QR Code Login:', values);
      ApiService.authentication
        .fidoGetSpTicket(request_push)
        .then((response_push) => {
          if (response_push.sp_ticket != '') {
            props.setLoading(false);
            this.state.token = response_push.sp_ticket;
            this.OnLoginHandler(values.account, response_push.sp_ticket);
          }
        })
        .catch(() => {
          props.setLoading(false);
        });
    } else if (values.loginType === 'push') {
      // Push 登入邏輯
      // console.log('Push Login:', values);
      ApiService.authentication
        .fidoRequestAthOrSignPush(request_push)
        .then((response_push) => {
          if (response_push.sp_ticket != '') {
            this.OnLoginHandler(values.account, response_push.sp_ticket);
          }
        })
        .catch(() => {
          props.setLoading(false);
        });
    }
    actions.setSubmitting(false);
  };

  OnLoginHandler = (id_num, sp_ticket) => {
    const { props } = this;

    if (this.loginHandler) clearInterval(this.loginHandler);
    this.loginHandler = setInterval(() => {
      const request_signin = new SignInFidoResultRequest({
        id_num: id_num,
        sp_ticket: sp_ticket,
      });
      ApiService.authentication
        .fidoGetAthOrSignResult(request_signin)
        .then((response) => {
          // console.log(response)
          if (response.accessToken != '') {
            clearInterval(this.loginHandler);
            //登入成功
            saveToken({
              access_token: response.accessToken,
              access_token_expired_at: response.accessTokenExpiredAt,
              refresh_token: response.refreshToken,
              refresh_token_expired_at: response.refreshTokenExpiredAt,
            })
              .then(() => {
                ApiService.sysUserAccount
                  .readSysUserAccountById(response.id)
                  .then((employeeResponse) => {
                    saveTokenAndUserInfo({
                      account: employeeResponse.email,
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
                      rolePermissionIdList:
                        employeeResponse.rolePermissionIdList,
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
          }
        })
        .catch(() => {
          props.setLoading(false);
        });
    }, '5000');
  };

  render() {
    const { props, state } = this;

    return (
      <div className="fido-login">
        <Formik
          initialValues={FidoLoginForm.initialValue({})}
          validationSchema={FidoLoginForm.validationSchema()}
          onSubmit={this.onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            touched,
            values,
            errors,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="login-form"
              autoComplete="off"
            >
              <div className="fido-grid">
                <div className="fido-description qr-description">
                  {props.language.fidoLogin.qrDescription}
                </div>
                <div className="fido-description push-description">
                  {props.language.fidoLogin.pushDescription}
                </div>
              </div>
              <div className="login-content">
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
              </div>

              {state.token && (
                <div className="login-content center">
                  <QRCodeSVG value={state.token} />
                </div>
              )}

              <div className="fido-grid">
                <ButtonDiv
                  className="login-button qr-button"
                  onClick={() => {
                    setFieldValue('loginType', 'qr'); // 設置登入類型
                    handleSubmit(); // 提交表單
                  }}
                >
                  {props.language.fidoLogin.qrlogin}
                </ButtonDiv>
                <ButtonDiv
                  className="login-button"
                  onClick={() => {
                    setFieldValue('loginType', 'push'); // 設置登入類型
                    handleSubmit(); // 提交表單
                  }}
                >
                  {props.language.fidoLogin.pushlogin}
                </ButtonDiv>
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
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

FidoLogin.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FidoLogin),
);

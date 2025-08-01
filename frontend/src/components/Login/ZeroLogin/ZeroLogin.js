import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

import ButtonDiv from '../../../lib/components/ButtonDiv/ButtonDiv';
import ValidateInput from '../../../lib/components/inputs/ValidateInput/ValidateInput';
import IdentityBinding from './IdentityBinding/IdentityBinding';
import LoginSystem from './LoginSystem/LoginSystem';

import { setLoading } from '../../../store/loading/slice';

import ApiService from '../../../utils/api/ApiService';
import Path from '../../../utils/path/path';
import SignInByZeroRequest from '../../../utils/dataModels/Authentication/signInByZeroRequest';
import {
  saveToken,
  saveTokenAndUserInfo,
  setChangeRequired,
} from '../../../utils/auth/auth';
import UserService from '../../../services/UserService';
import './ZeroLogin.scss';
import setId from '../../../assets/images/zerologin/identityBindingButton.svg';
import setIdDescription from '../../../assets/images/zerologin/setIdDescription.png';
import zloginImg from '../../../assets/images/zerologin/loginSystemButton.svg';

class ZeroLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navigatePage: Path.mainPath,
      isClearText: false,
      validateTimestamp: new Date(),
      isIdentityBindingModal: false,
      isLoginSystemModal: false,
    };
  }

  //   componentDidMount() {
  //     window.addEventListener('message', this.receiveMessage, false);
  //   }

  //   receiveMessage = (event) => {
  //     try {
  //           this.setSignature(event.data);
  //         } catch (error) {
  //       console.error(error);
  //     }
  //   };

  setSignature = () => {
    const { props, state } = this;
    // console.log(UserService.getUsername())
    // console.log(UserService.getToken())
    const request = new SignInByZeroRequest({
      username: UserService.getUsername(),
      token: UserService.getToken(),
    });
    ApiService.authentication
      .signInByZero(request)
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
                  account: state.username,
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
        this.setValidateTimestamp(new Date());
      });
  };

  doLoginClick = () => {
    const { state } = this;
    state.isLoginSystemModal = true;
  };

  onLogin = () => {
    UserService.doLogin().then();
  };

  navigatePage = () => {
    const { props, state } = this;
    props.history.replace(state.navigatePage);
  };

  openIdentityBindingDialogModal = () => {
    const { state } = this;
    state.isIdentityBindingModal = true;
  };

  render() {
    const { props, state } = this;

    return (
      <div className="zero-login">
        <Formik initialValues={null} onSubmit={this.onSubmit}>
          {({ submitForm }) => (
            <div className="grid">
              {state.isIdentityBindingModal && (
                <IdentityBinding
                  onClose={() => {
                    state.isIdentityBindingModal = false;
                  }}
                ></IdentityBinding>
              )}
              {state.isLoginSystemModal && (
                <LoginSystem
                  onLogin={() => {
                    this.onLogin();
                  }}
                  onClose={() => {
                    state.isLoginSystemModal = false;
                  }}
                  onIdentityBinding={() => {
                    state.isIdentityBindingModal = true;
                    state.isLoginSystemModal = false;
                  }}
                ></LoginSystem>
              )}
              <div className="image-grid">
                <div className="image-left">
                  <ButtonDiv
                    className="zlogin"
                    onClick={this.openIdentityBindingDialogModal}
                  >
                    <img
                      className="setId"
                      src={setId}
                      width={'125px'}
                      alt="setId"
                      title={props.language.zeroLogin.identityBindingTitle}
                    />
                  </ButtonDiv>
                </div>
                <div className="image-right">
                  <ButtonDiv className="zlogin" onClick={this.doLoginClick}>
                    <img
                      className="zlogin"
                      src={zloginImg}
                      width={'125px'}
                      alt="zlogin"
                      title={props.language.zeroLogin.loginSystemTitle}
                    />
                  </ButtonDiv>
                </div>
              </div>
              <div className="txt-grid">
                <div className="txt-left">
                  <h2>身分綁定</h2>
                </div>
                <div className="txt-right">
                  <h2>登入系統</h2>
                </div>
              </div>
            </div>
          )}
        </Formik>
        {/* <button className="login-button" onClick={() => UserService.doLogin()}>
                Login
        </button> */}{' '}
      </div>
    );
  }

  componentDidMount() {
    if (UserService.getToken() !== undefined) {
      this.setSignature();
    }
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

ZeroLogin.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ZeroLogin),
);

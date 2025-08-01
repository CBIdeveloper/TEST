import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import BoxSelector from '../../lib/components/inputs/BoxSelector/BoxSelector';

import AccountLogin from './AccountLogin/AccountLogin';
import BackgroundCarousel from '../BackgroundCarousel/BackgroundCarousel';
import CertificateSwitch from './CertificateSwitch/CertificateSwitch';
import ZeroLogin from './ZeroLogin/ZeroLogin';

import Path from '../../utils/path/path';
import QueryType from '../../utils/types/QueryType';
import { isUserLogin } from '../../utils/auth/auth';

import './Login.scss';

import logo from '../../assets/images/logo/logo.png';
import qrcode from '../../assets/images/qrcode/qrcode.jpg';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'zero',
      // mode: 'account',
      navigatePage: Path.mainPath,
      imageSize: 0,
    };
  }

  componentDidMount() {
    this.authCheck();
    this.initImageSize();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { props } = this;
    if (props.query.queryObject !== prevProps.query.queryObject) {
      this.redirectCheck();
    }
    if (
      props.windowSize.height !== prevProps.windowSize.height ||
      props.windowSize.width !== prevProps.windowSize.width
    ) {
      this.initImageSize();
    }
  }

  setNavigatePage = (navigatePage) => {
    this.setState({ navigatePage });
  };

  setMode = (mode) => {
    this.setState({ mode });
  };

  setImageSize = (imageSize) => {
    this.setState({ imageSize });
  };

  initImageSize = () => {
    const { props } = this;
    const imageSize =
      props.windowSize.height > props.windowSize.width
        ? props.windowSize.height
        : props.windowSize.width;
    this.setImageSize(imageSize);
  };

  redirectCheck = () => {
    const { props } = this;
    const redirect = props.query.queryObject.get(QueryType.REDIRECT);
    if (redirect !== null) {
      this.setNavigatePage(atob(redirect));
    }
  };

  authCheck = () => {
    if (isUserLogin()) {
      this.navigatePage();
    } else {
      this.redirectCheck();
    }
  };

  navigatePage = () => {
    const { props, state } = this;
    props.history.replace(state.navigatePage);
  };

  displayContent = () => {
    const { state } = this;
    if (state.mode === 'zero') {
      return <ZeroLogin />;
    }
    if (state.mode === 'account') {
      return <AccountLogin />;
    }
    if (state.mode === 'certificate') {
      return <CertificateSwitch />;
    }
    if (state.mode === 'fido') {
      return <FidoLogin />;
    }
    return '';
  };

  render() {
    const { props, state } = this;

    return (
      <div className="login" style={{ height: `${state.imageSize}px` }}>
        <BackgroundCarousel size={state.imageSize} />
        <div className="login-dialog">
          <img className="logo" src={logo} alt="logo" />
          <div className="dialog-body">
            <div className="login-title">{props.language.login.title}</div>
            <div className="inputs">
              <BoxSelector
                title=""
                inputName=""
                inputValue={state.mode}
                options={[
                  { text: props.language.login.ZeroLogin, value: 'zero' },
                  // { text: props.language.login.accountLogin, value: 'account' },
                  {
                    text: props.language.login.certificateLogin,
                    value: 'certificate',
                  },
                ]}
                setFieldValue={(field, value) => {
                  this.setMode(value);
                }}
                zenMode
              />
              {this.displayContent()}
            </div>
            <div className="login-register-description">
              {/* <NavLink className="navigation-button" to={Path.forgotPasswordPath}> */}
              {/*   {props.language.login.forgotPassword} */}
              {/* </NavLink> */}
              <div className="login-dash">
                <h2>未持有系統帳號者請先申請帳號</h2>
              </div>
              <div className="login-register-button">
                <NavLink className="navigation-button" to={Path.registerPath}>
                  {props.language.login.register}
                </NavLink>
                <NavLink
                  className="navigation-button"
                  to={Path.registerProgressPath}
                >
                  {props.language.login.registerProgress}
                </NavLink>
              </div>
            </div>
            <div className="login-contact">
              <div className="login-contact-title">
                <span className="login-contact-title-text">
                  {props.language.login.systemIssueContact}
                </span>
              </div>
              <hr style={{ borderColor: 'black' }}/>
              <div className="login-contact-body">
                <div className="left">
                  <div>
                    <div>
                      <label className="login-contact-officeHours-label">
                        {props.language.login.officeHours}
                      </label>
                      <span>{props.language.login.officeHoursHint}</span>
                    </div>
                  </div>
                  <div className="login-contact-accountRegister">
                    <div>
                      <label className="login-contact-accountRegister-label">
                        {props.language.login.accountRegister}
                      </label>
                      <span>{props.language.login.accountRegisterContact}</span>
                    </div>
                    <span>
                      {props.language.login.accountRegisterContactPhone}
                    </span>
                  </div>
                  <div className="login-contact-system">
                    <div>
                      <label className="login-contact-system-label">
                        {props.language.login.system}
                      </label>
                      <span>{props.language.login.systemContact}</span>
                    </div>
                    <span>{props.language.login.systemContactPhone}</span>
                  </div>
                  <div className="login-contact-mobilizationPlan">
                    <div>
                      <label className="login-contact-mobilizationPlan-label">
                        {props.language.login.mobilizationPlan}
                      </label>
                      <span>
                        {props.language.login.mobilizationPlanContact}
                      </span>
                    </div>
                    <span>{props.language.login.mobilizationPlanPhone}</span>
                  </div>
                </div>
                <div className="qr-code">
                  <img className="qrcode" src={qrcode} alt="qrcode" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  windowSize: state.window.windowSize,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({});

Login.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  windowSize: PropTypes.objectOf(Object).isRequired,
  query: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

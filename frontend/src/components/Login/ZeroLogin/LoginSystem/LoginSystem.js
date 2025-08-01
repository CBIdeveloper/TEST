import React from 'react';
import PropTypes from 'prop-types';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Modal from '../../../../lib/components/Modal/Modal';

import './LoginSystem.scss';
import ChooseLogin from '../../../../assets/images/zerologin/loginSystem//loginSystem_chooseLogin.png';
import LoginMethodOne01 from '../../../../assets/images/zerologin/loginSystem//loginSystem_loginMethod01_01.png';
import LoginMethodOne02 from '../../../../assets/images/zerologin/loginSystem/loginSystem_loginMethod01_02.png';
import LoginMethodOne03 from '../../../../assets/images/zerologin/loginSystem/loginSystem_loginMethod01_03.png';
import LoginMethodTwo01 from '../../../../assets/images/zerologin/loginSystem/loginSystem_loginMethod02_01.png';
import LoginMethodTwo02 from '../../../../assets/images/zerologin/loginSystem/loginSystem_loginMethod02_02.png';
import LoginMethodThree01 from '../../../../assets/images/zerologin/loginSystem/loginSystem_loginMethod03_01.png';
import LoginMethodThree02 from '../../../../assets/images/zerologin/loginSystem/loginSystem_loginMethod03_02.png';

class LoginSystem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '登入系統 - 操作說明',
      currentPage: 0,
    };
  }

  onClose = () => {
    this.props.onClose();
  };

  onLogin = () => {
    this.props.onLogin();
  };

  onVideo = (untrustedURL) => {
    var newWindow = window.open();
    newWindow.opener = null;
    newWindow.location = untrustedURL;
  };

  onIdentityBinding = () => {
    this.props.onIdentityBinding(0);
  };

  goPush = () => {
    this.setState((prevState) => ({
      currentPage: 1,
    }));
  };

  goQRCode = () => {
    this.setState((prevState) => ({
      currentPage: 2,
    }));
  };

  goFIDO = () => {
    this.setState((prevState) => ({
      currentPage: 3,
    }));
  };

  pages = [
    <div className="choose-login-method">
      <div className="header-row">
        <div className="title">【選擇登入方式】</div>
        <div className="button-container">
          <ButtonDiv
            className="push-button"
            onClick={this.goPush}
            children={
              <div className="push-button-content">
                <span>推播登入</span>
              </div>
            }
          ></ButtonDiv>
          <ButtonDiv
            className="fido-button"
            onClick={this.goFIDO}
            children={
              <div className="fido-button-content">
                <span>FIDO2(指紋)快速登入</span>
              </div>
            }
          ></ButtonDiv>
          <ButtonDiv
            className="qr-button"
            onClick={this.goQRCode}
            children={
              <div className="qr-button-content">
                <span>QR Code</span>
              </div>
            }
          ></ButtonDiv>
        </div>
      </div>
      <div className="content-row">
        <div>
          <p>
            點擊上方「是，登入系統」進入登入網頁，接著可透過點擊下圖右上方「其他登入方式」，選擇登入辨證方式：
          </p>
          <p>
            <span className="coffee-text">● 推播登入（手機）</span>
            ：透過推播通知到<span className="coffee-text">手機</span>
            進行APP身分驗證。
          </p>
          <p>
            <span className="coffee-text">● QR Code （手機）</span>：透過
            <span className="coffee-text">手機</span>掃描網頁QR
            Code進行身分驗證。
          </p>
          <p>
            <span className="green-text">● FIDO2（指紋辨識裝置）</span>：透過
            <span className="green-text">外接式指紋辨證裝置</span>或
            <span className="green-text">電腦內建指紋辨識裝置</span>
            進行身分驗證。
          </p>
        </div>
        <div className="img-container1">
          <img src={ChooseLogin} alt="ChooseLogin" />
        </div>
      </div>
    </div>,
    <div className="login-method-one">
      <div className="header-row">
        <div className="title">【登入方式一：推播登入】</div>
        <div className="button-container">
          <ButtonDiv
            className="qr-button"
            onClick={this.goQRCode}
            children={
              <div className="qr-button-content">
                <span>QR Code</span>
              </div>
            }
          ></ButtonDiv>
          <ButtonDiv
            className="fido-button"
            onClick={this.goFIDO}
            children={
              <div className="fido-button-content">
                <span>FIDO2(指紋)快速登入</span>
              </div>
            }
          ></ButtonDiv>
        </div>
      </div>
      <div className="content-row">
        <div>
          <p>1. 選擇「推播登入」，輸入使用者電子郵件，點選「發送推播驗證」</p>
        </div>
        <div className="img-container1">
          <img src={LoginMethodOne01} alt="LoginMethodOne01" />
        </div>
        <div className="description-row2">
          <p>
            2. 綁定裝置(手機)將收到推播通知，請檢查登入資訊中
            <span className="identityCode">識別碼</span>與網頁顯示上的
            <span className="verifyCode">驗證碼</span>
            是否相同，若一致表示為本人，可點選「同意」進行登入，如非本人登入請點選「不同意」。
          </p>
        </div>
        <div className="img-container2">
          <img src={LoginMethodOne02} alt="LoginMethodOne02" />
        </div>
        <div>
          <p>
            ※如使用者電子信箱輸入錯誤或導向
            <span className="green-text">錯誤畫面</span>（如下左圖），請
            <span className="green-text">回到主系統網頁</span>
            （如下右圖）重新點選「<span className="green-text">登入系統</span>
            」按鈕重新登入
          </p>
        </div>
        <div className="img-container2">
          <img src={LoginMethodOne03} alt="LoginMethodOne03" />
        </div>
      </div>
    </div>,
    <div className="login-method-two">
      <div className="header-row">
        <div className="title">【登入方式二：QR Code】</div>
        <div className="button-container">
          <ButtonDiv
            className="push-button"
            onClick={this.goPush}
            children={
              <div className="push-button-content">
                <span>推播登入</span>
              </div>
            }
          ></ButtonDiv>
          <ButtonDiv
            className="fido-button"
            onClick={this.goFIDO}
            children={
              <div className="fido-button-content">
                <span>FIDO2(指紋)快速登入</span>
              </div>
            }
          ></ButtonDiv>
        </div>
      </div>
      <div className="content-row">
        <div>
          <p>1. 選擇「QR Code」，網頁上將出現下圖QR Code。</p>
        </div>
        <div className="img-container1">
          <img src={LoginMethodTwo01} alt="LoginMethodTwo01" />
        </div>
        <div className="description-row2">
          <p>
            2. 打開已綁定手機中的OETH APP，點擊「開始掃描」掃描網頁QR
            Code，選擇登入帳號後，接續完成生物辨識/圖形鎖的辨證，即可成功登入主系統網頁。
          </p>
        </div>
        <div className="img-container2">
          <img src={LoginMethodTwo02} alt="LoginMethodTwo02" />
        </div>
      </div>
    </div>,
    <div className="login-method-three">
      <div className="header-row">
        <div className="title">【登入方式三：FIDO2(指紋)快速登入】</div>
        <div className="button-container">
          <ButtonDiv
            className="push-button"
            onClick={this.goPush}
            children={
              <div className="push-button-content">
                <span>推播登入</span>
              </div>
            }
          ></ButtonDiv>
          <ButtonDiv
            className="qr-button"
            onClick={this.goQRCode}
            children={
              <div className="qr-button-content">
                <span>QR Code</span>
              </div>
            }
          ></ButtonDiv>
        </div>
      </div>
      <div className="content-row">
        <div>
          <p>
            1.
            點選其他登入方式點選「FIDO2快速登入」，點擊中間按鈕「安全金鑰/生物驗證」。
          </p>
        </div>
        <div className="img-container1">
          <img src={LoginMethodThree01} alt="LoginMethodThree01" />
        </div>
        <div>
          <p>
            2.
            於您綁定之外接式指紋辨證裝置或電腦內建指紋辨識裝置感應指紋辨識，完成辨識感應即可登入。
          </p>
        </div>
        <div className="img-container2">
          <img src={LoginMethodThree02} alt="LoginMethodThree02" />
        </div>
      </div>
    </div>,
  ];

  render = () => {
    const { state } = this;
    const { currentPage, title } = state;
    return (
      <Modal
        show={true}
        onClose={this.onClose}
        header={title}
        sizeType="full-height"
        children={
          <div className="loginSystem-modal">
            <ButtonDiv
              className="loginSystem-button-video"
              children={<span>操作說明影片</span>}
              onClick={() => this.onVideo('https://drive.google.com/file/d/16GQf9ovg24ypf9VU_QW15PUH7EGBJ178/view')}
            ></ButtonDiv>
            <div className="loginSystem-header">
              <div>
                本系統已整合零信任安全機制，須先完成身分綁定，請問是否已完成?
              </div>
              <div className="button-row">
                <ButtonDiv
                  className="loginSystem-button"
                  children={<span>是，登入系統</span>}
                  onClick={this.onLogin}
                ></ButtonDiv>
                <ButtonDiv
                  className="binding-button"
                  children={<span>否，開始綁定</span>}
                  onClick={this.onIdentityBinding}
                ></ButtonDiv>
              </div>
              <div className="title">{title}</div>
            </div>
            <div className="loginSystem-content">{this.pages[currentPage]}</div>
          </div>
        }
      ></Modal>
    );
  };
}

LoginSystem.propTypes = {
  onClose: PropTypes.func.isRequired,
  onIdentityBinding: PropTypes.func.isRequired,
};

export default LoginSystem;

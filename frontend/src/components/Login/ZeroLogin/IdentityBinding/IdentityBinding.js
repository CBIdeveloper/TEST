import React from 'react';
import PropTypes from 'prop-types';
import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Modal from '../../../../lib/components/Modal/Modal';

import './IdentityBinding.scss';
import StepOne01 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step01_01.png';
import StepTwo01 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step02_01.png';
import StepThreeFIDO01 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_FIDO_01.png';
import StepThreeFIDO02 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_FIDO_02.png';
import StepThreeFIDO03 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_FIDO_03.png';
import StepThreeFIDO04 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_FIDO_04.png';
import StepThreeFIDO05 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_FIDO_05.png';
import StepThreeQRCode01 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_QRCode_01.png';
import StepThreeQRCode02 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_QRCode_02.png';
import StepThreeQRCode03 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_QRCode_03.png';
import StepThreeQRCode04 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_QRCode_04.png';
import StepThreeQRCode05 from '../../../../assets/images/zerologin/identityBinding/identityBinding_Step03_QRCode_05.png';
import IdentityBidingButton from '../../../../assets/images/zerologin/identityBindingButton.svg';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

class IdentityBinding extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '身分綁定 - 操作說明',
      currentPage: 0,
    };
  }

  pages = [
    <div className="step-one-container">
      <div className="description-row">
        <p>點選右上方「開始綁定」開始執行身分綁定輸入：</p>
        <p>
          <span className="email">①電子信箱：</span>{' '}
          <span className="system">全民防衛動員資訊整合系統</span>申請之電子信箱
        </p>
        <p>
          <span className="password">②密碼：</span>
          <span className="system">全民防衛動員資訊整合系統</span>申請之密碼
        </p>
        <p>填寫完成後，點選「Sign In」鈕，接續執行進行身分綁定。</p>
      </div>
      <div className="img-row">
        <div className="img-container1">
          <img src={StepOne01} alt="StepOne01" />
        </div>
      </div>
    </div>,
    <div className="step-two-container">
      <div className="description-row">
        <p>透過點擊右上方「其他註冊方式」，可選擇綁定方式，分為兩種：</p>
        <p>
          <span className="green-text">● 安全金鑰（指紋辨識裝置）</span>：透過
          <span className="green-text">外接式指紋辨證裝置</span>或
          <span className="green-text">電腦內建指紋辨識裝置</span>進行身分綁定
        </p>
        <p>
          <span className="coffee-text">● QR Code （手機） ：</span>
          透過個人或公務<span className="coffee-text">手機</span>
          進行身分綁定，依其裝置可進行
          <span className="coffee-text">
            ①紅外線人臉辨識 ②指紋辨識 ③圖形鎖辨證（擇一）
          </span>
        </p>
      </div>
      <div>
        <div className="img-container1">
          <img src={StepTwo01} alt="StepTwo01" />
        </div>
      </div>
    </div>,
    <div className="step-three-fido-container">
      <div>
        <p>1. 選擇「安全金鑰」進行綁定。</p>
      </div>
      <div className="img-row1">
        <div className="img-container1">
          <img src={StepThreeFIDO01} alt="StepThreeFIDO01" />
        </div>
      </div>
      <div>
        <p>● 可支援FIDO2安全金鑰註冊的方式</p>
      </div>
      <div className="img-row2">
        <div className="img-container1">
          <img src={StepThreeFIDO02} alt="StepThreeFIDO02" />
        </div>
      </div>
      <div>
        <p>2. 點擊「開始註冊」，對話窗內選擇「安全性金鑰」。</p>
      </div>
      <div className="img-row3">
        <div className="img-container1">
          <img src={StepThreeFIDO03} alt="StepThreeFIDO03" />
        </div>
      </div>
      <div>
        <p>3. 請使用外接式指紋辨證裝置或電腦內建指紋辨識裝置感應指紋辨識。。</p>
      </div>
      <div className="img-row4">
        <div className="img-container1">
          <img src={StepThreeFIDO04} alt="StepThreeFIDO04" />
        </div>
      </div>
      <div>
        <p>4. 完成註冊後，請回到主系統網頁進行「登入系統」作業。</p>
      </div>
      <div className="img-row5">
        <div className="img-container1">
          <img src={StepThreeFIDO05} alt="StepThreeFIDO05" />
        </div>
      </div>
    </div>,
    <div className="step-three-qrcode-container">
      <p>
        1. 需先於手機安裝「OETH」APP，可於Google Play/App
        Store上，搜尋「OETH」進行安裝，或依行動裝置作業系統掃描下方QR
        Code進行安裝。
      </p>
      <div className="img-row1">
        <div className="img-container1">
          <img src={StepThreeQRCode01} alt="StepThreeQRCode01" />
        </div>
      </div>
      <p>2. 安裝APP完成後，請選擇「QR Code」接續執行身分綁定。</p>
      <div className="img-row2">
        <div className="img-container1">
          <img src={StepThreeQRCode02} alt="StepThreeQRCode02" />
        </div>
      </div>
      <p>3. 請選擇下列一種手機身分綁定方式</p>
      <p>【手機身分綁定方式①－可透過相機掃碼適用】</p>
      <p>於OETH APP點選「開始啟用」，掃描網頁QR Code。</p>
      <div className="img-row3">
        <div className="img-container1">
          <img src={StepThreeQRCode03} alt="StepThreeQRCode03" />
        </div>
      </div>
      <p>【手機身分綁定方式②－無法透過相機掃碼適用】</p>
      <p>
        使用手機收取信件，點選信件內「驗證連結」路徑，將自動跳轉至「OETH」APP。
      </p>
      <div className="img-row4">
        <div className="img-container1">
          <img src={StepThreeQRCode04} alt="StepThreeQRCode04" />
        </div>
      </div>
      <p>
        4.
        驗證方式可選擇「圖形驗證」或「生物驗證」其中一種，在啟用完成頁面點擊「完成」後，請回到主系統網頁進行「登入系統」。
      </p>
      <div className="img-row4">
        <div className="img-container1">
          <img src={StepThreeQRCode05} alt="StepThreeQRCode05" />
        </div>
      </div>
    </div>,
  ];

  pageNumber = [
    '一：登入',
    '二：選擇綁定方式',
    <span>
      三 - <span className="green-text">安全金鑰（指紋辨識裝置）綁定</span>
    </span>,
    <span>
      三 - <span className="coffee-text">QR Code （手機） 綁定</span>
    </span>,
    '四',
  ];

  onClose = () => {
    this.props.onClose();
  };

  onSkip = () => {
    window.open(
      'https://adms.oeth.webcomm.com.tw/auth/enroll/redirect',
      '_blank',
    );
    this.onClose();
  };

  goToNextPage = () => {
    this.setState((prevState) => ({
      currentPage: Math.min(prevState.currentPage + 1, this.pages.length - 1),
    }));
  };

  goToPrevPage = () => {
    this.setState((prevState) => ({
      currentPage: Math.max(prevState.currentPage - 1, 0),
    }));
  };

  onVideo = (untrustedURL) => {
    var newWindow = window.open();
    newWindow.opener = null;
    newWindow.location = untrustedURL;
  };

  render = () => {
    const { state } = this;
    const { currentPage, title } = state;
    return (
      <Modal
        show={true}
        onClose={this.onClose}
        header={title}
        modalClassName="modalClassName"
        sizeType="full-height"
        children={
          <div className="identityBinding-modal">
            <div className="identityBinding-header">
              <div className="margin-div"></div>
              <ButtonDiv
                className="identityBinding-header-video"
                children={<span>操作說明影片</span>}
                onClick={() => this.onVideo('https://drive.google.com/file/d/1TJAS0hV7yzdVNxlYb3ew4v0pYeAYc5mi/view')}
              ></ButtonDiv>
              <div className="title">身分綁定 - 操作說明</div>
              <ButtonDiv
                className="skip-button"
                onClick={this.onSkip}
                children={
                  <div className="buttonDiv">
                    <div className="img-container1">
                      <img src={IdentityBidingButton} alt="IdentityBidingButton" />
                    </div>
                    <div className="text">開始綁定</div>
                  </div>
                }
              ></ButtonDiv>
            </div>
            <div className="identityBinding-content">
              <div className="page-row">
                <ButtonDiv
                  className={`previous-button ${currentPage === 0 ? 'hidden' : ''
                    }`}
                  onClick={this.goToPrevPage}
                  children={
                    <div className="previous-button-content">
                      <FaCaretLeft
                        style={{ color: '#468ae7' }}
                        size={20}
                      ></FaCaretLeft>
                      <span>上一步驟</span>
                    </div>
                  }
                ></ButtonDiv>
                <span>【操作說明 - 步驟{this.pageNumber[currentPage]}】</span>
                <ButtonDiv
                  className={`next-button ${currentPage === this.pages.length - 1 ? 'hidden' : ''
                    }`}
                  onClick={this.goToNextPage}
                  children={
                    <div className="next-button-content">
                      <span>下一步驟</span>
                      <FaCaretRight
                        style={{ color: '#468ae7' }}
                        size={20}
                      ></FaCaretRight>
                    </div>
                  }
                ></ButtonDiv>
              </div>
              <div className="content-row">{this.pages[currentPage]}</div>
            </div>
          </div>
        }
      ></Modal>
    );
  };
}

IdentityBinding.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default IdentityBinding;

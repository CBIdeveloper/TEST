import React from 'react';
import PropTypes from 'prop-types';
import './PrivacyPolicy.scss';
import Modal from '../../lib/components/Modal/Modal';
import ApiService from '../../utils/api/ApiService';
import Path from '../../utils/path/path';
import ModalHelper from '../../utils/helper/ModalHelper';
import { setPrivacy,removeTokens } from '../../utils/auth/auth';

class PrivacyPolicy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '資訊安全暨個資保護政策聲明',
      currentPage: 1,
      isAtBottom: false,
      privacy: null,
    };
  }

  // setPrivacy = (privacy) => {
  //   this.setState({ privacy });
  // };
  onLogout = () => {
    const { props } = this;
    ApiService.authentication.signOut().then((response) => {
      if (response.executed) {
        removeTokens();
        //props.history.replace(Path.loginPath);
      } else {
        ModalHelper.openErrorModal({
          message: '登出失敗！',
        });
      }
    });
  };

  onClose = () => {
    setPrivacy('123456');
    this.props.onClose();
  };

  handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      this.privacyTextRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    if (isAtBottom !== this.state.isAtBottom) {
      this.setState({ isAtBottom });
    }
  };

  render = () => {
    const { state } = this;
    const { title } = state;
    return (
      <Modal
        show={true}
        onClose={() => {}}
        header={title}
        modalClassName="modalClassName"
        isCloseBtn={false}
        children={
          <div className="privacy-text">
            <p className="indented-paragraph">
              「<span className="bold-text">全民防衛動員資訊整合系統</span>
              」（下稱整合系統）業務涉及跨公務機關共用性及全國性個人資料檔案持有，依據資通安全責任等級分級辦法第4條第3、4款，其資通安全責任等級列屬A級。
            </p>
            <p className="indented-paragraph">
              為妥適管理動員資料與應用，落實資訊安全，避免機敏資訊與個人資料不當使用或外洩，爰就資料編管權責、使用限制、更新驗證、保護機制及帳號管理權責等事項，敘明各機關應盡管理權責：
            </p>
            <div className="custom-line"></div>
            <p className="indented-paragraph3">一、 資料編管權責</p>
            <p className="indented-paragraph2">
              各動員機關依全動法第13條、第15條、第16條、第17條、第20條、第21條、第22條、第23條、第24條及第25條授權實施調調查、統計、編組及異動校正後，匯入整合系統運用；動員編管、演訓簽證等資料涉及個人資料蒐集、處理及利用，依個人資料保護法第15條第1款、第16條第2、5款及第18條規範，由各機關指定專人辦理安全維護事宜。
            </p>
            <p className="indented-paragraph3">二、 資料使用限制</p>
            <p className="indented-paragraph2">
              整合系統內各動員編管、演訓及簽證資訊，僅限各機關依法定職務必要範圍內，提供查詢使用權限，並得視各機關業務需要，限制資料使用對象，強化資料維護與管理。
            </p>
            <p className="indented-paragraph3">三、 資料維護驗證</p>
            <p className="indented-paragraph2">
              各機關依整合系統內各編管類別之資料規格蒐整維護，以提升資料品質，並於年度業務評鑑與演習時機驗證資料可用性。
            </p>
            <p className="indented-paragraph3">四、 資料保護機制</p>
            <p className="indented-paragraph2">（一） 管理人員安全查核：</p>
            <p className="indented-paragraph4">
              各機關依據個資法第18條，完成人事安全查核，指定專人維護管理系統動員資料，並負同法第28、31條損害賠償與國家賠償責任，確維系統資料保管運用。
            </p>
            <p className="indented-paragraph2">（二） 個人資料遮蔽顯示：</p>
            <p className="indented-paragraph4">
              整合系統內「查詢報表」功能具備個人資料查詢與名冊匯出功能。個人資料於平時運用時，採半遮蔽方式顯示（例：王*明、A123***456）；若依法定職務必要範圍內調查需求，得經機關業務主管同意後，函文國防部全民防衛動員署（行政院動員會報秘書單位）申請，並採特定時限內開放完整個人資料之明碼查詢，以加強個人資料保護措施。
            </p>
            <p className="indented-paragraph2">（三） 動員資料匯出管制：</p>
            <p className="indented-paragraph4">
              各機關執行動員編管、演訓或簽證資料匯出作業時，整合系統內均設有紀錄功能，以掌握資料流向，並定期提供各機關匯出纪錄知悉，俾利管控操作異常現象發生（例：大量匯出），以期有效管制資料匯出情形。
            </p>
            <p className="indented-paragraph2">（四） 系統加密防護措施：</p>
            <p className="indented-paragraph4">
              整合系統僅限動員業務相關機關、單位業務需求開放使用，透過網路防火牆白名單限制、機關憑證加密傳輸（T-Road）、網站傳輸加密協定（HTTPS）、資料雜湊亂碼儲存（HASH）及資料庫金鑰加密保護（CMK）外，並配合數位發展部導入「零信任」驗證制度，建置系统帳號多因子認證（身分、設備、行為模式）、高權限實體儲存管控、程式資料庫防竄改控制等資訊安全防護控制措施。
            </p>
            <div className="custom-line"></div>
            <p className="indented-paragraph2">（五） 我們重視您的隱私：</p>
            <p className="indented-paragraph4">
              蒐集之目的：本系統可能會蒐集到您的個人資料（如姓名、身分證號、電子郵件、聯絡資訊、IP位置等），主要用途包括「提供資（通）訊系統服務與技術支援」、「優化網站體驗與服務」、「分析流量與連線活動」及「遵守相關法令規範」等部分。
            </p>
            <p className="indented-paragraph4">
              資料使用範圍：您的個人資料僅限本網站或與業務執行相關之資（通）訊服務使用，除非獲得您的明確同意，否則不會與第三方共享，除非法律要求或執法機關要求提供。
            </p>
            <p className="indented-paragraph4">
              資料保存期間：本署根據ISO 27701與相關隱私權法規（如：GDPR、個人資料保護法），於合理期間內保存您的資料，並於目的達成後刪除或匿名化。
            </p>
            <p className="indented-paragraph4">
              您的權利：根據適用法規，您可要求查詢、更正、刪除您的個人資料，或撤回同意，請透過【聯絡方式】與我們聯繫。
            </p>
            <p className="indented-paragraph4">
              Cookie與第三方認證技術：本網站使用Cookie與第三方認證技術（如零信任驗證及行動自然人憑證驗證），來提升用戶體驗及個人化內容。如您不同意，請調整您的瀏覽器Cookie或網站權限設定。
            </p>
            <p className="indented-paragraph4">
              我已閱讀並同意本網站的隱私權政策與個人資料使用條款。
            </p>
            <div className="privacy-div">
              <button className="privacy-button" onClick={this.onClose}>
                同意
              </button>
              <button className="privacy-button" onClick={this.onLogout}>
                不同意
              </button>
            </div>
          </div>
        }
      />
    );
  };
}

PrivacyPolicy.propTypes = {
  onClose: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default PrivacyPolicy;

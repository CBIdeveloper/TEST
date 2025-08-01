import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ApiService from '../../utils/api/ApiService';

import './Footer.scss';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { totalUser: 0 };
  }

  componentDidMount() {
    ApiService.accumulatedLoginNumber
      .getAccumulatedLoginNumber()
      .then((response) => {
        this.setTotalUser(response);
      });
  }

  setTotalUser = (totalUser) => {
    this.setState({ totalUser });
  };

  render() {
    const { props, state } = this;
    const version = VERSION;
    return (
      <div className="footer">
        <div className="info-section">
          <div className="info-row">
            <a
              className="info-item link"
              href="https://afrc.mnd.gov.tw/AFRCWeb/Content.aspx?ID=1&MenuID=129"
              target="_blank"
              rel="noreferrer noopener"
            >
              {props.language.footer.privacyPolicy}
            </a>
            <a
              className="info-item link"
              href="https://afrc.mnd.gov.tw/AFRCWeb/Content.aspx?ID=1&MenuID=130"
              target="_blank"
              rel="noreferrer noopener"
            >
              {props.language.footer.informationSecurity}
            </a>
            <a
              className="info-item link"
              href="https://afrc.mnd.gov.tw/AFRCWeb/Content.aspx?ID=1&MenuID=131"
              target="_blank"
              rel="noreferrer noopener"
            >
              {props.language.footer.openDataDeclaration}
            </a>
            <a
              className="info-item link"
              href="https://afrc.mnd.gov.tw/AFRCWeb/Content.aspx?ID=1&MenuID=444"
              target="_blank"
              rel="noreferrer noopener"
            >
              {props.language.footer.personalDataProtection}
            </a>
          </div>
          <div className="info-row">
            <div className="info-item contact">
              {props.language.footer.address}
            </div>
            <div className="info-item contact">
              {props.language.footer.phone}
            </div>
            <div className="info-item contact">
              {props.language.footer.service}
            </div>
          </div>
          <div className="info-row">
            <div className="info-item contect">
              {props.language.login.accountRegister}
              {props.language.login.accountRegisterContact}
              {props.language.login.accountRegisterContactPhone}
            </div>
            <div className="info-item contect">
              {props.language.login.system}
              {props.language.login.systemContact}
              {props.language.login.systemContactPhone}
            </div>
            <div className="info-item contect">
              {props.language.login.mobilizationPlan}
              {props.language.login.mobilizationPlanContact}
              {props.language.login.mobilizationPlanPhone}
            </div>
          </div>
          <div className="copyright">{props.language.footer.copyright}</div>
        </div>
        <div className="counter">
          <div>{`${props.language.footer.totalUser}${state.totalUser}`}</div>
          <div>{`${props.language.footer.version}${version}`}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

Footer.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

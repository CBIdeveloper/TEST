import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import ButtonDiv from '../../lib/components/ButtonDiv/ButtonDiv';
import MenuItem from './MenuItem/MenuItem';

import { setNotificationList } from '../../store/notification/slice';

import ApiService from '../../utils/api/ApiService';
import DateHelper from '../../utils/helper/DateHelper';
import HeaderMenuConfig from '../../utils/config/HeaderMenuConfig';
import ReminderTable from '../../utils/tables/ReminderTable';
import ModalHelper from '../../utils/helper/ModalHelper';
import Path from '../../utils/path/path';
import {
  getName,
  getUnitName,
  getJobPosition,
  removeTokens,
  getChangePassword,
  getAccessToken,
  getPrivacy,
} from '../../utils/auth/auth';
import './Header.scss';
import PrivacyPolicy from '../Policy/PrivacyPolicy';
import logo from '../../assets/images/logo/logo.png';
import notificationOff from '../../assets/images/icons/notification_off.png';
import notificationOn from '../../assets/images/icons/notification_on.png';
import logout from '../../assets/images/icons/logout.png';
import logoutHover from '../../assets/images/icons/logout_hover.png';
import { dateObjectToDateTimeMinuteString } from '../../utils/parsers/dateParser';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      unit: getUnitName(),
      name: getName(),
      jobPosition: getJobPosition(),
      isHover: false,
      permissionExpiration: null,
      isLoginSystemModal: true,
      privacy: getPrivacy(),
    };
  }

  componentDidMount() {
    if (getAccessToken()) {
      this.getPermissionExpiration();
    }
  }

  setIsHover = (isHover) => {
    this.setState({ isHover });
  };

  setPermissionExpiration = (permissionExpiration) => {
    this.setState({ permissionExpiration });
  };

  notificationImageSource = () => {
    const { props } = this;
    return props.notification.notificationList.length > 0
      ? notificationOn
      : notificationOff;
  };

  logoutImageSource = () => {
    const { state } = this;
    return state.isHover ? logoutHover : logout;
  };

  displayMenus = () =>
    HeaderMenuConfig.map((item) => (
      <MenuItem
        key={item.name}
        menuName={item.name}
        path={item.path}
        subMenus={item.subMenus}
        singleMenu={item.singleMenu}
        fixed={item.fixed}
      />
    ));

  handleLogoutOnClicked = () => {
    const { props } = this;
    ApiService.authentication.signOut().then((response) => {
      if (response.executed) {
        removeTokens();
        props.history.replace(Path.loginPath);
      } else {
        ModalHelper.openErrorModal({
          message: '登出失敗！',
        });
      }
    });
  };
  //小鈴鐺
  openReminderModal = () => {
    const { props } = this;
    const today = new Date();
    ApiService.reminder
      .getReminderList(DateHelper.addDays(today, -10))
      .then((response) => {
        props.setNotificationList(response.data);

        ModalHelper.openTableModal({
          modalTitle: '待辦事項',
          sectionTitle: '待辦事項',
          TableClass: ReminderTable,
          typeId: 0,
        });
      });
  };

  getPermissionExpiration = () => {
    ApiService.permissionApplication
      .readPermissionApplicationExpiration()
      .then((response) => {
        const { data } = response;
        this.setPermissionExpiration(
          DateHelper.momentDateString(data.permission_expiration, 'YYYY-MM-DD HH:mm'),
        );
      });
  };

  render() {
    const { props, state } = this;
    //登入後介面
    return (
      <div className="header">
        {state.privacy == 'undefined' && state.isLoginSystemModal && (
          <PrivacyPolicy
            onClose={() => {
              state.isLoginSystemModal = false;
            }}
          ></PrivacyPolicy>
        )}
        <div className="header-content">
          <NavLink to={Path.mainPath}>
            <img src={logo} className="logo" alt="logo" />
          </NavLink>
          {props.logoOnly ? (
            ''
          ) : (
            <div className="menu-user-section">
              {getChangePassword() ? (
                ''
              ) : (
                <div className="menu-section">{this.displayMenus()}</div>
              )}
              <div className="user-section">
                <div className="username-section">
                  <div className="username">
                    <div>{state.unit}</div>
                    <div>
                      {state.name}
                      {state.jobPosition}
                    </div>
                  </div>

                  <ButtonDiv
                    className="logout"
                    onClick={this.handleLogoutOnClicked}
                    onMouseOver={() => this.setIsHover(true)}
                    onMouseLeave={() => this.setIsHover(false)}
                  >
                    <img
                      className="logout"
                      src={this.logoutImageSource()}
                      alt="logout"
                    />
                  </ButtonDiv>
                  <ButtonDiv
                    className="notification"
                    onClick={this.openReminderModal}
                  >
                    <img
                      className="notification"
                      src={this.notificationImageSource()}
                      alt="notification"
                    />
                  </ButtonDiv>
                </div>
                <div>
                  {state.permissionExpiration && (
                    <span className="permission-expiration">
                      {props.language.header.permission}
                      {state.permissionExpiration}
                      {props.language.header.expire}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  notification: state.notification.notification,
});

const mapDispatchToProps = (dispatch) => ({
  setNotificationList: (payload) => dispatch(setNotificationList(payload)),
});

Header.defaultProps = {
  logoOnly: false,
};

Header.propTypes = {
  notification: PropTypes.objectOf(Object).isRequired,
  setNotificationList: PropTypes.func.isRequired,
  logoOnly: PropTypes.bool,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

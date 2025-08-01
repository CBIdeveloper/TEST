import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AuthGuardRoute from '../../lib/components/auth/AuthGuardRoute';
import Header from '../Header/Header';

import Homepage from '../Homepage/Homepage';
import Announcement from '../Announcement/Announcement';
import BusinessManagement from '../BusinessManagement/BusinessManagement';
import DataSearch from '../DataSearch/DataSearch';
import RetrievalService from '../RetrievalService/RetrievalService';
import SystemManagement from '../SystemManagement/SystemManagement';
import MobilizationEnergy from '../MobilizationEnergy/MobilizationEnergy';
import ChangePassword from '../ChangePassword/ChangePassword';

import { setNotificationList } from '../../store/notification/slice';

import ApiService from '../../utils/api/ApiService';
import DataSearchMenu from '../../utils/menu/dataSearch/dataSearchMenu';
import ServeMenu from '../../utils/menu/qanda/serveMenu';
import DateHelper from '../../utils/helper/DateHelper';
import Path from '../../utils/path/path';
import Routes from '../../lib/components/Routes/Routes';

import './Entry.scss';
import Qanda from '../QandA/Qanda';

class Entry extends React.PureComponent {
  componentDidMount() {
    const { props } = this;
    const today = new Date();
    ApiService.reminder
      .getReminderList(DateHelper.addDays(today, -10))
      .then((response) => {
        props.setNotificationList(response.data);
      });
  }

  render() {
    const { props } = this;

    return (
      <div className="entry">
        <Header />
        <div className="entry-viewport">
          {/* 變更密碼 ChangePassword */}
          <AuthGuardRoute
            ignorePasswordCheck
            path={Path.changePasswordPath}
            component={ChangePassword}
          />
          {/* 業務管考 MobilizationEnergy */}
          <AuthGuardRoute
            path={props.menu.getMenuPath([Path.mobilizationEnergyPath])}
            component={MobilizationEnergy}
          />
          {/* 業務管考 BusinessManagement */}
          <AuthGuardRoute
            path={props.menu.getMenuPath([Path.businessManagementPath])}
            component={BusinessManagement}
          />
          {/* 檢索服務 RetrievalService */}
          <AuthGuardRoute
            path={props.menu.getMenuPath([Path.retrievalServicePath])}
            component={RetrievalService}
          />
          {/* 資料查詢 DataSearch */}
          <AuthGuardRoute
            path={props.menu.getMenuPath([Path.dataSearchPath])}
            component={DataSearch}
            exact
          />
          <Routes
            path={props.menu.getMenuPath([DataSearchMenu.path])}
            menu={DataSearchMenu}
          />
          {/* Q&A */}
          <AuthGuardRoute
            path={props.menu.getMenuPath([Path.servePath])}
            component={Qanda}
            exact
          />
          <Routes
            path={props.menu.getMenuPath([ServeMenu.path])}
            menu={ServeMenu}
          />
          {/* 系統管理 SystemManagement */}
          <AuthGuardRoute
            path={props.menu.getMenuPath([Path.systemManagementPath])}
            component={SystemManagement}
          />
          {/* 最新消息 Announcement */}
          <AuthGuardRoute
            exact
            path={Path.announcementPath}
            component={Announcement}
          />
          {/* 首頁 Homepage */}
          <AuthGuardRoute exact path={Path.mainPath} component={Homepage} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  menu: state.menu.menu.menuInstance,
});

const mapDispatchToProps = (dispatch) => ({
  setNotificationList: (payload) => dispatch(setNotificationList(payload)),
});

Entry.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  menu: PropTypes.objectOf(Object).isRequired,
  setNotificationList: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Entry));

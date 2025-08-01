import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isMobile, isIOS } from 'react-device-detect';
import { Route, Switch, withRouter } from 'react-router-dom';

import Entry from '../Entry/Entry';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import RegisterProgress from '../RegisterProgress/RegisterProgress';

import AuthGuardRoute from '../../lib/components/auth/AuthGuardRoute';
import DialogModal from '../Modals/DialogModal/DialogModal';
import FullScreenLoading from '../../lib/components/FullScreenLoading/FullScreenLoading';

import { resizeWindow } from '../../store/window/slice';
import { setQueryObject } from '../../store/route/slice';
import { resetSelectList } from '../../store/table/slice';
import { setMenu } from '../../store/menu/slice';
import { setTimer, resetTimer } from '../../store/counter/slice';

import ApiService from '../../utils/api/ApiService';
import DateHelper from '../../utils/helper/DateHelper';
import Menu from '../../utils/menu/Menu';
import menuList from '../../utils/menu/menuList';
import ModalHelper from '../../utils/helper/ModalHelper';
import Path from '../../utils/path/path';
import preloadImagesList from '../../utils/preload/preloadImages';
import {
  isUserLogin,
  removeTokens,
  getLastActionTime,
  setLastActionTime,
} from '../../utils/auth/auth';

import './App.scss';
import '../../assets/stylesheet/react-datepicker.scss';
import UserService from '../../services/UserService';
//login登入跳轉
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mediaQueryList = window.matchMedia('(orientation: portrait)');
    this.state = {
      isPreloadImagesLoaded: false,
      isInitKeycloaked: false,
    };
    props.setMenu(new Menu(menuList));
  }

  componentDidMount() {
    this.setCounter();
    this.setQueryObject();
    this.setupWindowSize();
    this.promisePreloadImages();
    this.promiseInitKeycloak();
    document.addEventListener('mousemove', this.resetTimer);
    document.addEventListener('click', this.resetTimer);
    document.addEventListener('touchstart', this.resetTimer);
    document.addEventListener('keydown', this.resetTimer);
    document.addEventListener('scroll', this.resetTimer);
    window.addEventListener('resize', this.setupWindowSize);
    window.onbeforeunload = () => false;
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props.location.search !== prevProps.location.search) {
      this.setQueryObject();
      props.resetSelectList();
    }
    if (props.location.pathname !== prevProps.location.pathname) {
      props.resetSelectList();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.resetTimer);
    document.removeEventListener('click', this.resetTimer);
    document.removeEventListener('touchstart', this.resetTimer);
    document.removeEventListener('keydown', this.resetTimer);
    document.removeEventListener('scroll', this.resetTimer);
    window.removeEventListener('resize', this.setupWindowSize);
  }

  setCounter = () => {
    setInterval(() => {
      const { props } = this;
      if (isUserLogin()) {
        const timer = props.counter.counterTimer - 1;
        if (timer <= 0) {
          this.logoutUser();
        } else {
          props.setTimer(props.counter.counterTimer - 1);
        }
      }
    }, 1000);
  };

  actionTimeCheck = () => {
    const now = new Date();
    const lastActionTime = getLastActionTime();
    if (isUserLogin() && DateHelper.minuteDiff(now, lastActionTime) > 60) {
      this.logoutUser();
    }
  };

  resetTimer = () => {
    const { props } = this;
    this.actionTimeCheck();
    setLastActionTime(new Date());
    props.resetTimer();
  };

  logoutUser = () => {
    const { props } = this;
    ApiService.authentication.signOut().then((response) => {
      if (response.executed) {
        removeTokens();
        ModalHelper.openMessageModal({
          message: props.language.app.logoutMessage,
          callback: () => {
            props.history.replace(Path.loginPath);
          },
        });
      } else {
        ModalHelper.openErrorModal({
          message: '登出失敗！',
        });
      }
    });
  };

  setQueryObject = () => {
    const { props } = this;
    const { search } = props.location;
    const query = new URLSearchParams(search);
    props.setQueryObject(query);
  };

  setupWindowSize = () => {
    const { props } = this;
    if (isMobile) {
      const isPortrait = this.mediaQueryList.matches;
      if (isIOS && !isPortrait) {
        props.resizeWindow({
          width: window.screen.height,
          height: window.screen.width,
        });
      } else {
        props.resizeWindow({
          width: window.screen.width,
          height: window.screen.height,
        });
      }
    } else {
      props.resizeWindow({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  promisePreloadImages() {
    const preloadImage = (image) =>
      new Promise((resolve, reject) => {
        const imageElement = new Image();
        imageElement.src = image;
        imageElement.onload = () => {
          resolve(image);
        };
        imageElement.onerror = (err) => {
          reject(err);
        };
      });
    Promise.all(preloadImagesList.map((image) => preloadImage(image)))
      .then(() => {
        this.setState({ isPreloadImagesLoaded: true });
      })
      .catch((err) => {
        console.log('Preload Images Failed', err);
      });
  }

  promiseInitKeycloak() {
    UserService.initKeycloak().then(() => {
      this.setState({ isInitKeycloaked: true });
    });
  }

  render() {
    const { state } = this;
    const { props } = this;

    if (!state.isPreloadImagesLoaded || !state.isInitKeycloaked) {
      return '';
    }
    return (
      <main
        className={`${isMobile ? 'mobile' : 'desktop'} ${
          props.windowSize.orientation
        } ${props.windowSize.windowClassType}`}
      >
        <Switch>
          <Route exact path={Path.loginPath} component={Login} />
          <Route exact path={Path.registerPath} component={Register} />
          <Route
            exact
            path={Path.registerProgressPath}
            component={RegisterProgress}
          />
          <AuthGuardRoute
            ignorePasswordCheck
            path={Path.mainPath}
            component={Entry}
          />
        </Switch>
        <footer>
          <Footer />
        </footer>

        <DialogModal />
        <FullScreenLoading />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  windowSize: state.window.windowSize,
  counter: state.counter.counter,
});

const mapDispatchToProps = (dispatch) => ({
  resizeWindow: (payload) => dispatch(resizeWindow(payload)),
  setQueryObject: (payload) => dispatch(setQueryObject(payload)),
  resetSelectList: (payload) => dispatch(resetSelectList(payload)),
  setMenu: (payload) => dispatch(setMenu(payload)),
  setTimer: (payload) => dispatch(setTimer(payload)),
  resetTimer: (payload) => dispatch(resetTimer(payload)),
});

App.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  windowSize: PropTypes.objectOf(Object).isRequired,
  counter: PropTypes.objectOf(Object).isRequired,
  resizeWindow: PropTypes.func.isRequired,
  setQueryObject: PropTypes.func.isRequired,
  resetSelectList: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '../../lib/components/Container/Container';
import SideMenu from '../../lib/components/SideMenu/SideMenu';
import Routes from '../../lib/components/Routes/Routes';

import BusinessManagementMenu from '../../utils/menu/businessManagement/businessManagementMenu';
import BusinessManagementDetailMenu from '../../utils/menu/businessManagement/businessManagementDetail/businessManagementDetailMenu';
import Path from '../../utils/path/path';
import './BusinessManagement.scss';
import urlParser from '../../utils/parsers/urlParser';

class BusinessManagement extends React.PureComponent {
  
  componentDidMount() {
    const { props } = this;
    const urlArray = props.location.pathname.split('/');
    if (urlArray.slice(-1)[0] === Path.businessManagementDetailPath) {
      props.history.push({
        pathname: urlParser([props.location.pathname, Path.importantPolicyPath]),
      });
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const urlArray = this.props.location.pathname.split('/');
      if (urlArray.slice(-1)[0] === Path.businessManagementDetailPath) {
        this.props.history.push({
          pathname: urlParser([this.props.location.pathname, Path.importantPolicyPath]),
        });
      }
    }
  }

  render() {
    const { props } = this;
    const urlArray = props.location.pathname.split('/');
    return (
      urlArray.slice(-1)[0] === Path.topicEffectPath ? (
        <div className="business-management-not-menu">
          <Routes
            path={props.menu.getMenuPath([
              BusinessManagementMenu.path,
            ])}
            menu={BusinessManagementMenu}
          />
        </div>
      ) : (
        <div className="business-management">
          <SideMenu
            menuName={BusinessManagementDetailMenu.name}
            menuList={BusinessManagementDetailMenu.subMenus}
            menuPrefix={[
              BusinessManagementMenu.path,
              BusinessManagementDetailMenu.path,
            ]}
          />
          <Container>
            <Routes
              path={props.menu.getMenuPath([
                BusinessManagementMenu.path,
                BusinessManagementDetailMenu.path,
              ])}
              menu={BusinessManagementDetailMenu}
              forceMode
            />
          </Container>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu.menu.menuInstance,
});

const mapDispatchToProps = (dispatch) => ({});

BusinessManagement.propTypes = {
  menu: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessManagement);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from '../../../lib/components/Container/Container';
import Routes from '../../../lib/components/Routes/Routes';
import SideMenu from '../../../lib/components/SideMenu/SideMenu';

import RetrievalServiceMenu from '../../../utils/menu/retrievalService/retrievalServiceMenu';
import PlanDownloadManagementMenu from '../../../utils/menu/retrievalService/planDownloadManagement/planDownloadManagementMenu';
import Path from '../../../utils/path/path';
import UrlParser from '../../../utils/parsers/urlParser';

import './PlanDownloadManagement.scss';

class PlanDownloadManagement extends React.PureComponent {
  componentDidMount() {
    const { props } = this;
    const urlArray = props.location.pathname.split('/');
    if (urlArray.slice(-1)[0] === Path.planDownloadManagementPath) {
      const route = [props.location.pathname];
      const validSubMenu = PlanDownloadManagementMenu.subMenus.filter((item) =>
        item.display(),
      );
      if (validSubMenu.length > 0) {
        route.push(validSubMenu[0].path);
      }
      props.history.push({ pathname: UrlParser(route) });
    }
  }

  render() {
    const { props } = this;

    return (
      <div className="plan-download-management">
        <SideMenu
          menuName={PlanDownloadManagementMenu.name}
          menuList={PlanDownloadManagementMenu.subMenus}
          menuPrefix={[
            RetrievalServiceMenu.path,
            PlanDownloadManagementMenu.path,
          ]}
          color="yellow"
        />
        <Container>
          <Routes
            path={props.menu.getMenuPath([
              RetrievalServiceMenu.path,
              PlanDownloadManagementMenu.path,
            ])}
            menu={PlanDownloadManagementMenu}
            forceMode
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu.menu.menuInstance,
});

const mapDispatchToProps = (dispatch) => ({});

PlanDownloadManagement.propTypes = {
  menu: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlanDownloadManagement),
);

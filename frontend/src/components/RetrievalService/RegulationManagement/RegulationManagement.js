import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from '../../../lib/components/Container/Container';
import Routes from '../../../lib/components/Routes/Routes';
import SideMenu from '../../../lib/components/SideMenu/SideMenu';

import RetrievalServiceMenu from '../../../utils/menu/retrievalService/retrievalServiceMenu';
import RegulationManagementMenu from '../../../utils/menu/retrievalService/regulationManagement/regulationManagementMenu';
import Path from '../../../utils/path/path';
import UrlParser from '../../../utils/parsers/urlParser';

import './RegulationManagement.scss';

class RegulationManagement extends React.PureComponent {
  componentDidMount() {
    const { props } = this;
    const urlArray = props.location.pathname.split('/');
    if (urlArray.slice(-1)[0] === Path.regulationManagementPath) {
      props.history.push({
        pathname: UrlParser([
          props.location.pathname,
          Path.generalManagementPath,
        ]),
      });
    }
  }

  render() {
    const { props } = this;

    return (
      <div className="regulation-detail">
        <SideMenu
          menuName={RegulationManagementMenu.name}
          menuList={RegulationManagementMenu.subMenus}
          menuPrefix={[
            RetrievalServiceMenu.path,
            RegulationManagementMenu.path,
          ]}
          color="yellow"
        />
        <Container>
          <Routes
            path={props.menu.getMenuPath([
              RetrievalServiceMenu.path,
              RegulationManagementMenu.path,
            ])}
            menu={RegulationManagementMenu}
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

RegulationManagement.propTypes = {
  menu: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegulationManagement),
);

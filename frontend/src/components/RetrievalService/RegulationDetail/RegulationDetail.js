import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from '../../../lib/components/Container/Container';
import Routes from '../../../lib/components/Routes/Routes';
import SideMenu from '../../../lib/components/SideMenu/SideMenu';

import RetrievalServiceMenu from '../../../utils/menu/retrievalService/retrievalServiceMenu';
import RegulationDetailMenu from '../../../utils/menu/retrievalService/regulationDetail/regulationDetailMenu';
import Path from '../../../utils/path/path';
import UrlParser from '../../../utils/parsers/urlParser';

import './RegulationDetail.scss';

class RegulationDetail extends React.PureComponent {
  componentDidMount() {
    const { props } = this;
    const urlArray = props.location.pathname.split('/');
    if (urlArray.slice(-1)[0] === Path.regulationDetailPath) {
      props.history.push({
        pathname: UrlParser([props.location.pathname, Path.generalPath]),
      });
    }
  }

  render() {
    const { props } = this;

    return (
      <div className="regulation-detail">
        <SideMenu
          menuName={RegulationDetailMenu.name}
          menuList={RegulationDetailMenu.subMenus}
          menuPrefix={[RetrievalServiceMenu.path, RegulationDetailMenu.path]}
          color="yellow"
        />
        <Container breadcrumb={false}>
          <Routes
            path={props.menu.getMenuPath([
              RetrievalServiceMenu.path,
              RegulationDetailMenu.path,
            ])}
            menu={RegulationDetailMenu}
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

RegulationDetail.propTypes = {
  menu: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegulationDetail),
);

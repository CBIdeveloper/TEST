import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Routes from '../../lib/components/Routes/Routes';

import SystemManagementMenu from '../../utils/menu/systemManagement/systemManagementMenu';

import './SystemManagement.scss';

class SystemManagement extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="system-management">
        <Routes
          path={props.menu.getMenuPath([SystemManagementMenu.path])}
          menu={SystemManagementMenu}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu.menu.menuInstance,
});

const mapDispatchToProps = (dispatch) => ({});

SystemManagement.propTypes = {
  menu: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemManagement);

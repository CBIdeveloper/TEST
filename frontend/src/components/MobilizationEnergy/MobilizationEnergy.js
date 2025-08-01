import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Routes from '../../lib/components/Routes/Routes';

import MobilizationEnergyMenu from '../../utils/menu/mobilizationEnergy/mobilizationEnergyMenu';

import './MobilizationEnergy.scss';

class MobilizationEnergy extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="mobilization-energy">
        <Routes
          path={props.menu.getMenuPath([MobilizationEnergyMenu.path])}
          menu={MobilizationEnergyMenu}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu.menu.menuInstance,
});

const mapDispatchToProps = (dispatch) => ({});

MobilizationEnergy.propTypes = {
  menu: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobilizationEnergy);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BaseRegulationDetailTable from '../BaseRegulationDetailTable';
import { SUPPLY_RESOURCE } from '../../../../utils/constants/RegulationEnumType';

class SupplyResource extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <BaseRegulationDetailTable
        title={props.language.retrievalService.subMenus.supplyResource}
        typeId={SUPPLY_RESOURCE}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

SupplyResource.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplyResource);

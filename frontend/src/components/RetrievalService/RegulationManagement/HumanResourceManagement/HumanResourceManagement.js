import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegulationDetailTable from '../BaseRegulationManagementTable';
import { HUMAN_RESOURCE } from '../../../../utils/constants/RegulationEnumType';

class HumanResourceManagement extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <RegulationDetailTable
        title={props.language.retrievalService.subMenus.humanResource}
        typeId={HUMAN_RESOURCE}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

HumanResourceManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HumanResourceManagement);

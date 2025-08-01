import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegulationDetailTable from '../BaseRegulationManagementTable';
import { HEALTH } from '../../../../utils/constants/RegulationEnumType';

class HealthManagement extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <RegulationDetailTable
        title={props.language.retrievalService.subMenus.health}
        typeId={HEALTH}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

HealthManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthManagement);

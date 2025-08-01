import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegulationDetailTable from '../BaseRegulationManagementTable';
import { CIVIL } from '../../../../utils/constants/RegulationEnumType';

class CivilManagement extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <RegulationDetailTable
        title={props.language.retrievalService.subMenus.civil}
        typeId={CIVIL}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

CivilManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CivilManagement);

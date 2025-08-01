import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegulationDetailTable from '../BaseRegulationManagementTable';
import { SPIRITUAL } from '../../../../utils/constants/RegulationEnumType';

class SpiritualManagement extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <RegulationDetailTable
        title={props.language.retrievalService.subMenus.spiritual}
        typeId={SPIRITUAL}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

SpiritualManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpiritualManagement);

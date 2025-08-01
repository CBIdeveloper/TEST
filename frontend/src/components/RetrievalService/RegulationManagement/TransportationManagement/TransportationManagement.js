import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegulationDetailTable from '../BaseRegulationManagementTable';
import { TRANSPORTATION } from '../../../../utils/constants/RegulationEnumType';

class TransportationManagement extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <RegulationDetailTable
        title={props.language.retrievalService.subMenus.transportation}
        typeId={TRANSPORTATION}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

TransportationManagement.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransportationManagement);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BaseRegulationDetailTable from '../BaseRegulationDetailTable';
import { TRANSPORTATION } from '../../../../utils/constants/RegulationEnumType';

class Transportation extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <BaseRegulationDetailTable
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

Transportation.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transportation);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BaseRegulationDetailTable from '../BaseRegulationDetailTable';
import { MILITARY } from '../../../../utils/constants/RegulationEnumType';

class Military extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <BaseRegulationDetailTable
        title={props.language.retrievalService.subMenus.military}
        typeId={MILITARY}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

Military.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Military);

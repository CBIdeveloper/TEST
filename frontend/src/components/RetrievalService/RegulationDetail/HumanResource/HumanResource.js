import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BaseRegulationDetailTable from '../BaseRegulationDetailTable';
import { HUMAN_RESOURCE } from '../../../../utils/constants/RegulationEnumType';

class HumanResource extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <BaseRegulationDetailTable
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

HumanResource.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HumanResource);

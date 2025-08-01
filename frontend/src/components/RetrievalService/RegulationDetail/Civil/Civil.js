import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BaseRegulationDetailTable from '../BaseRegulationDetailTable';
import { CIVIL } from '../../../../utils/constants/RegulationEnumType';

class Civil extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <BaseRegulationDetailTable
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

Civil.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Civil);

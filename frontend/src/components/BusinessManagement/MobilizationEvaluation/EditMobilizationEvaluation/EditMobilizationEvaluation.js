import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditMobilizationEvaluation extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-mobilization-evaluation">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus
              .editMobilizationEvaluation
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

EditMobilizationEvaluation.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMobilizationEvaluation);

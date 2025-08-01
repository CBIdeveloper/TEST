import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditMobilizationReport extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-mobilization-report">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus.editMobilizationReport
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

EditMobilizationReport.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMobilizationReport);

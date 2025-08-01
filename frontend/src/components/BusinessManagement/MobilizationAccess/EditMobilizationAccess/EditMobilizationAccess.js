import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditMobilizationAccess extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-mobilization-access">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus.editMobilizationAccess
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

EditMobilizationAccess.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMobilizationAccess);

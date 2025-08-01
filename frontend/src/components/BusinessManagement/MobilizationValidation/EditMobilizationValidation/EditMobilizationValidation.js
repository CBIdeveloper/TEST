import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditMobilizationValidation extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-mobilization-validation">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus
              .editMobilizationValidation
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

EditMobilizationValidation.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMobilizationValidation);

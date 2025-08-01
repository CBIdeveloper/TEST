import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditMobilizationCategorization extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-mobilization-categorization">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus
              .editMobilizationCategorization
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

EditMobilizationCategorization.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMobilizationCategorization);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditMobilizationLecture extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-mobilization-lecture">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus.editMobilizationLecture
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

EditMobilizationLecture.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMobilizationLecture);

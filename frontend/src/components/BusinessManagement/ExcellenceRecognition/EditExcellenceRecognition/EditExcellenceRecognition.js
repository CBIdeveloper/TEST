import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditExcellenceRecognition extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-excellence-recognition">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus
              .editExcellenceRecognition
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

EditExcellenceRecognition.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditExcellenceRecognition);

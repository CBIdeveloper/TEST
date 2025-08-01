import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditMobilizationStrategy extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-mobilization-strategy">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus.editMobilizationStrategy
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

EditMobilizationStrategy.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMobilizationStrategy);

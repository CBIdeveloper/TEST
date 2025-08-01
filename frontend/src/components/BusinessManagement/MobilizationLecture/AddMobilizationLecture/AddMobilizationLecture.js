import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddMobilizationLecture extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-mobilization-lecture">
        <AddBusinessManagement
          title={
            props.language.businessManagement.subMenus.addMobilizationLecture
          }
          typeId={8}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMobilizationLecture.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMobilizationLecture);

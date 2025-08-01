import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddMobilizationValidation extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-mobilization-validation">
        <AddBusinessManagement
          title={
            props.language.businessManagement.subMenus.addMobilizationValidation
          }
          typeId={7}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMobilizationValidation.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMobilizationValidation);

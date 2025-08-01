import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddMobilizationCategorization extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-mobilization-categorization">
        <AddBusinessManagement
          title={
            props.language.businessManagement.subMenus
              .addMobilizationCategorization
          }
          typeId={4}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMobilizationCategorization.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMobilizationCategorization);

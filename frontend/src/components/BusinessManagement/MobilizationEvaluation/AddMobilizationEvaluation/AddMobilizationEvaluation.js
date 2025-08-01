import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddMobilizationEvaluation extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-mobilization-evaluation">
        <AddBusinessManagement
          title={
            props.language.businessManagement.subMenus.addMobilizationEvaluation
          }
          typeId={6}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMobilizationEvaluation.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMobilizationEvaluation);

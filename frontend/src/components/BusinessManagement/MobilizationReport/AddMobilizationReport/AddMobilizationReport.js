import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddMobilizationReport extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-mobilization-report">
        <AddBusinessManagement
          title={props.language.businessManagement.subMenus.addMobilizationReport}
          typeId={10}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMobilizationReport.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMobilizationReport);

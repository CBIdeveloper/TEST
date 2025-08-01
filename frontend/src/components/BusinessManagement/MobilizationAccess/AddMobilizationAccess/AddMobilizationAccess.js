import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddMobilizationAccess extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-mobilization-access">
        <AddBusinessManagement
          title={
            props.language.businessManagement.subMenus.addMobilizationAccess
          }
          typeId={5}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMobilizationAccess.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMobilizationAccess);

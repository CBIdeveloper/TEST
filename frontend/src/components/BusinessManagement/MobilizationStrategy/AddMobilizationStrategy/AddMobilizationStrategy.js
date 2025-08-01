import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddMobilizationStrategy extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-mobilization-strategy">
        <AddBusinessManagement
          title={
            props.language.businessManagement.subMenus.addMobilizationStrategy
          }
          typeId={3}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMobilizationStrategy.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMobilizationStrategy);
